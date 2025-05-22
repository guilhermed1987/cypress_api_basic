/// <reference types="cypress" />

describe('POST /api/cy', () => {

    it('GET device', () => {

        const currentTime = new Date().toISOString().slice(0, 16)
        const body = {
            'name': 'Apple MacBook Pro 16',
            'data': {
                'year': 2019,
                'price': 1849.99,
                'CPU model': 'Intel Core i9',
                'Hard disk size': '1 TB'
            }
        }

        cy.request({
            method: 'POST',
            failOnStatusCode: false,
            url: 'https://api.restful-api.dev/objects',
            body: body
        }).as('postDeviceResult')

        //validações
        cy.get('@postDeviceResult').then((response) => {
            expect(response.status).equal(200)
            expect(response.body.id).not.empty
            expect(response.body.createdAt).not.empty
            expect(response.body.createdAt.slice(0, 16)).be.equal(currentTime)
            expect(response.body.name).equal(body.name)
            expect(response.body.data.year).equal(body.data.year)
            expect(response.body.data.price).equal(body.data.price)
            expect(response.body.data['CPU model']).equal(body.data['CPU model'])
            expect(response.body.data['Hard disk size']).equal(body.data['Hard disk size'])
        })
    })

})