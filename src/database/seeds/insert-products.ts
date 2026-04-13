import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("products").del();

    // Inserts seed entries
    await knex("products").insert([
        { name: "Brownie Recheado de Café", price: 12 },
        { name: "Brownie Recheado de Caramelo Salgado", price: 12 },
        { name: "Brownie Recheado de Chocolate", price: 12 },
        { name: "Brownie Recheado de Leite Ninho", price: 12 },
        { name: "Brownie Recheado de ", price: 12 },
        { name: "Brownie Tradicional", price: 7 },
        { name: "Bombom Brownie", price: 5 },
        { name: "Brownie Cookie", price: 10 },
        { name: "Bolo Brownie", price: 180 },
    ]);
};
