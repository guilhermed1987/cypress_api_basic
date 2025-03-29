/// <reference types="cypress" />

describe('GET /api/cy', () => {

    it('GET device', () => {

        const device_id = '7'

        cy.api({
            method: 'GET',
            url: 'https://api.restful-api.dev/objects/' + device_id,
            failOnStatusCode: false
        }).as('getDeviceResult')

        cy.get('@getDeviceResult')
            .then((response) => {
                expect(response.status).equal(200)
                expect(response.body.id).equal(device_id)
                expect(response.body.name).equal('Apple MacBook Pro 16')
                expect(response.body.data.year).equal(2019)
                expect(response.body.data.price).equal(1849.99)
                expect(response.body.data['CPU model']).equal('Intel Core i9')
                expect(response.body.data['Hard disk size']).equal('1 TB')
        })

    })

})