import { describe, test, expect, it, beforeEach, beforeAll } from "@jest/globals"
import { Application } from "express"
import { DataSource } from "typeorm"
import { getTestApp } from "./config/helpers/getTestApp"
// import { getTestDb } from "./config/helpers/getTestDb"
import * as request from 'supertest'

import { User } from "../infrastructure/db/entities/User"
import { prepareTestDb } from "./config/helpers/prepareTestDb"
import { SignUpRequestBody } from "../UI/controllers/Authentication/requests/SignUpRequestBody"

import 'reflect-metadata'
import { TestConnection } from "../infrastructure/db/orm/Connection"
import { UI_UserDto } from "../UI/dto/UI_UserDto"

describe('/auth', () => {

    let db: DataSource
    let app: Application

    beforeAll(async () => {
        app = await getTestApp() // получаем тестовое окружение
        db = await TestConnection.initialize() // получаем тестовую базу данных
    })
    beforeEach(async () => {
        await prepareTestDb(db)
    })

    test('User can successfully register', async () => {
        const response = await request(app)
            .post('/api/auth/signup')
            .set('content-type', 'application/json')
            .send(new SignUpRequestBody(
                'test@mail.ru',
                '1q2w3e4r'
            ))


        const { email, id, password, role } = await db.getRepository<User>(User).findOneOrFail({
            where: {
                email: 'test@mail.ru'
            }
        })

        expect(email).toBe('test@mail.ru');
        expect(password).not.toBe('1q2w3e4r')
        expect(response.body).toEqual(new UI_UserDto(email, 'USER', id))

        expect(response.header['cookie']).toBeFalsy()
    })
})
// test.todo('User can succesfully login')
// test.todo('User gets 403 on invalid credentials')
// test.todo('User gets 401 on expired access token')
// test.todo('User gets 401 when refreshing if no fingerprint provided')
// test.todo('User gets 401 when refreshing if fingerprints are not equal')
// test.todo('User can get new access token using refresh token')
// test.todo('User can use refresh token only once')
// test.todo('All users refresh tokens become invalid on global logout')
// test.todo('Only one refresh token becomes invalid on local logout')
