import { describe, test, expect, beforeEach, mock } from 'bun:test';
import { LoginHandler } from '../../../../application/useCase/command/login/loginHandler';
import { LoginCommand } from '../../../../application/useCase/command/login/loginCommand';
import type { IUserRepository } from "../../../../application/persistences/IUserRepository";
import type { ICryptoHelper } from "../../../../../commonLib/applicationLib/interfaces/ICryptoHelper";
import type { IJwTokenGenerator } from "../../../../../commonLib/jwTokenLib/interfaces/IJwTokenGenerator";
import { LoginError } from "../../../../application/useCase/command/login/loginError";
import { UserEntity } from "../../../../domain/user/userEntity";
import { OkResponse } from "../../../../../commonLib/applicationLib/okResponse";
import type { IPublisher } from '../../../../../commonLib/mediatorLib/interfaces/IPublisher';

let mockUserRepository: IUserRepository;
let mockCryptoHelper: ICryptoHelper;
let mockJwtGenerator: IJwTokenGenerator;
let mockUserEntity: UserEntity;
let mockPublisher: IPublisher;

describe('loginHandler', () => {
    beforeEach(() => {
        mockUserRepository = {} as IUserRepository;
        mockCryptoHelper = {} as ICryptoHelper;
        mockJwtGenerator = {} as IJwTokenGenerator;
        mockUserEntity = {} as UserEntity;
        mockPublisher = {} as IPublisher;
        mockPublisher.publish = mock(mockPublisher.publish).mockResolvedValue();
    })

    test('when_user_not_found', async () => {
        mockUserRepository.getUserByAccount = mock(mockUserRepository.getUserByAccount).mockResolvedValue(null);

        const loginHandler = new LoginHandler(mockUserRepository, mockCryptoHelper, mockJwtGenerator, mockPublisher);
        const result = await loginHandler.handle({} as LoginCommand);
        expect(result).toBeInstanceOf(LoginError);
        expect(mockPublisher.publish).toBeCalled();
    });

    test('when_password_not_match', async () => {
        mockUserRepository.getUserByAccount = mock(mockUserRepository.getUserByAccount).mockResolvedValue(UserEntity.create(
            'account',
            'hashedPassword',
            'userName'
        ));
        mockCryptoHelper.hashPassword = mock(mockCryptoHelper.hashPassword).mockReturnValue('differentHashedPassword');

        const loginHandler = new LoginHandler(mockUserRepository, mockCryptoHelper, mockJwtGenerator, mockPublisher);
        const result = await loginHandler.handle({} as LoginCommand);
        expect(result).toBeInstanceOf(LoginError);
        expect(mockPublisher.publish).toBeCalled();
    });

    test('when_success', async () => {
        mockUserRepository.getUserByAccount = mock(mockUserRepository.getUserByAccount).mockResolvedValue(UserEntity.create(
            'account',
            'hashedPassword',
            'userName'
        ));
        mockCryptoHelper.hashPassword = mock(mockCryptoHelper.hashPassword).mockReturnValue('hashedPassword');
        mockUserRepository.getUserToken = () => 'token';

        const loginHandler = new LoginHandler(mockUserRepository, mockCryptoHelper, mockJwtGenerator, mockPublisher);
        const result = await loginHandler.handle({} as LoginCommand);
        expect(result).toBeInstanceOf(OkResponse);
        expect(mockPublisher.publish).not.toBeCalled();
    });
})