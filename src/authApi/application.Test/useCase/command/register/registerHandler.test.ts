import { describe, test, beforeEach, mock, expect } from 'bun:test';
import type { IUserRepository } from "../../../../application/persistences/IUserRepository";
import type { UserEntity } from "../../../../domain/user/userEntity";
import { RegisterHandler } from "../../../../application/useCase/command/register/registerHandler";
import type { ICryptoHelper } from "../../../../../commonLib/applicationLib/interfaces/ICryptoHelper";
import { RegisterCommand } from "../../../../application/useCase/command/register/registerCommand";
import { DuplicatedError } from "../../../../application/useCase/command/register/duplicatedError";
import { OkResponse } from "../../../../../commonLib/applicationLib/okResponse";

let mockUserRepository: IUserRepository;
let mockCryptoHelper: ICryptoHelper;

describe('registerHandler', () => {
    beforeEach(() => {
        mockUserRepository = {} as IUserRepository;
        mockCryptoHelper = {} as ICryptoHelper;
    })

    test('when_user_already_exist', async () => {
        mockUserRepository.getUserByAccount = mock(mockUserRepository.getUserByAccount).mockResolvedValue({} as UserEntity);

        const registerHandler = new RegisterHandler(mockUserRepository, mockCryptoHelper);
        const result = await registerHandler.handle({} as RegisterCommand);
        expect(result).toBeInstanceOf(DuplicatedError);
    });

    test('when_success', async () => {
        mockUserRepository.getUserByAccount = mock(mockUserRepository.getUserByAccount).mockResolvedValue(null);
        mockCryptoHelper.hashPassword = () => 'hashedPassword';
        mockUserRepository.createUser = mock(mockUserRepository.createUser).mockResolvedValue({} as UserEntity);

        const registerHandler = new RegisterHandler(mockUserRepository, mockCryptoHelper);
        const result = await registerHandler.handle({} as RegisterCommand);
        expect(result).toBeInstanceOf(OkResponse);
    });
})