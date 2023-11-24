import crypto from 'crypto'

import { faker } from '@faker-js/faker'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  var products = []

  for (let i = 0; i < 100; i++) {
    let product = {
      id: crypto.randomUUID(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 1, max: 200 }),
    }
    products.push(product)
  }
  // Deletes ALL existing entries
  await knex('Products').del()
  await knex('Products').insert(products)
}
