import path from 'path';
import { SUCCESS } from '../constants';

export type InputTestData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    pathToFile?: string;
    isSliderUnlocked?: boolean;
};

export type ExpectedTestData = {
    notToContainUrl?: string;
    errorMessage: string;
};

export type TestData = {
    validationCondition: string;
    inputTestData: InputTestData;
    expectedTestData: ExpectedTestData;
};

export const invalidTestsData: TestData[] = [
    {
        validationCondition: 'when passwords do not match',
        inputTestData: {
            firstName: 'testA',
            lastName: 'testB',
            email: 'email@gmail.com',
            password: '12345678',
            confirmPassword: '1234567',
            isSliderUnlocked: true,
        },
        expectedTestData: {
            notToContainUrl: SUCCESS,
            errorMessage: 'Passwords do not match!',
        },
    },
    {
        validationCondition: 'when password length less then 8',
        inputTestData: {
            firstName: 'testA',
            lastName: 'testB',
            email: 'email@gmail.com',
            password: '1234567',
            isSliderUnlocked: true,
        },
        expectedTestData: {
            notToContainUrl: SUCCESS,
            errorMessage: 'Password must be at least 8 characters long!',
        },
    },
    {
        validationCondition: 'when captcha is not solved',
        inputTestData: {
            firstName: 'testA',
            lastName: 'testB',
            email: 'email@gmail.com',
            password: '12345678',
            confirmPassword: '12345678',
            isSliderUnlocked: false,
        },
        expectedTestData: {
            notToContainUrl: SUCCESS,
            errorMessage: 'Please solve the captcha!',
        },
    },
    {
        validationCondition: 'when file size more then 2mb',
        inputTestData: {
            firstName: 'testA',
            lastName: 'testB',
            email: 'email@gmail.com',
            password: '12345678',
            confirmPassword: '12345678',
            isSliderUnlocked: true,
            pathToFile: path.join(__dirname, '..\\testData\\invalid-size.gif'),
        },
        expectedTestData: {
            notToContainUrl: SUCCESS,
            errorMessage: 'File size must be less than 2 MB.',
        },
    },
];

export const relativePathsToImages: string[] = [
    '..\\src\\testData\\test-jpg.jpg',
    '..\\src\\testData\\test-jpeg.jpeg',
    '..\\src\\testData\\test-png.png',
    '..\\src\\testData\\test-bmp.bmp',
    '..\\src\\testData\\test-gif.gif',
];
