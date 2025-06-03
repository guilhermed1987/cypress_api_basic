/// <reference types="cypress" />

describe('PUT /api/cy', () => {

    it('Modify device', () => {
    //Arrange
    // Create a new device and get its ID for deletion and actual modification date
    const currentTime = new Date().toISOString().slice(0, 16)
    const original_body = {
        'name': 'Apple MacBook Pro 16',
        'data': {
            'year': 2019,
            'price': 1849.99,
            'CPU model': 'Intel Core i9',
            'Hard disk size': '1 TB'
        }
    }

    const new_body = {
        'name': 'Allienware Aurora R14',
        'data': {
            'year': 2023,
            'price': 3000.00,
            'CPU model': 'Intel Core i9 updated',
            'Hard disk size': '4 TB'
        }
    }
        cy.api({
            method: 'POST',
            failOnStatusCode: false,
            body: original_body,
            url: 'https://api.restful-api.dev/objects',
        }).as('postDeviceResult')

    //Act
    // Modify, check and DELETE request to delete the device
        cy.get('@postDeviceResult').then((response_post) => {
            expect(response_post.status).equal(200)
            expect(response_post.body.name).equal(original_body.name)
            expect(response_post.body.data.year).equal(original_body.data.year)
            expect(response_post.body.data.price).equal(original_body.data.price)
            expect(response_post.body.data['CPU model']).equal(original_body.data['CPU model'])
            expect(response_post.body.data['Hard disk size']).equal(original_body.data['Hard disk size'])

            cy.api({
                method: 'PUT',
                url: 'https://api.restful-api.dev/objects/' + response_post.body.id,
                failOnStatusCode: false,
                body: new_body
            }).as('putDeviceResult')

    //Assert
    // Check the device modifications
        
    
        cy.get('@putDeviceResult').then((response_put) => {
            expect(response_put.status).equal(200)
            expect(response_put.body.name).equal(new_body.name)
            expect(response_put.body.data.year).equal(new_body.data.year)
            expect(response_put.body.data.price).equal(new_body.data.price)
            expect(response_put.body.data['CPU model']).equal(new_body.data['CPU model'])
            expect(response_put.body.data['Hard disk size']).equal(new_body.data['Hard disk size'])
            expect(response_put.body.updatedAt.slice(0,16)).to.equal(currentTime)
        })
        })
    })   
})