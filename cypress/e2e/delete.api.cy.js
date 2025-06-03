/// <reference types="cypress" />

describe('DELETE /api/cy', () => {

    it('DELETE device', () => {
    //Arrange
    // Create a new device and get its ID for deletion
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
            body: body,
            url: 'https://api.restful-api.dev/objects',
        }).as('postDeviceResult')

    //Act
    // Send a DELETE request to delete the device
        cy.get('@postDeviceResult').then((response_post) => {
            expect(response_post.status).equal(200)

            cy.request({
                method: 'DELETE',
                url: 'https://api.restful-api.dev/objects/' + response_post.body.id,
                failOnStatusCode: false
            }).as('deleteDeviceResult')

    //Assert
    // Check the device deletion status
        cy.get('@deleteDeviceResult').then((response_del) => {
            expect(response_del.status).equal(200)
            expect(response_del.body.message)
                .equal('Object with id = ' + response_post.body.id + ' has been deleted.')
        })
        })
    })   
})