/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('Products', (table) => {
    // table.increments('id')
    table.uuid('id', { useBinaryUuid: false, primaryKey: true })
    table.string('name').notNullable().index()
    table.string('description').notNullable().defaultTo('')
    table.decimal('price', 12, 2).notNullable().defaultTo(0)
    table.timestamps(true, true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  knex.schema.dropTableIfExists('Products')
}
