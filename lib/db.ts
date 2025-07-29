import {Pool} from "pg";

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: parseInt(process.env.SQL_PORT!),
})

export const getEntries2019 = async () => {
  const results = await pool.query(`SELECT * FROM gluto_2019;`);
  return results.rows;
};

export const getEntrybyIndex2019 = async (index: number) => {
  const results = await pool.query("SELECT * FROM gluto_2019;", [index]);
  return results.rows;
};

export const getEntries2020 = async () => {
  const results = await pool.query(`SELECT * FROM gluto_2020;`);
  return results.rows;
};

export const getEntrybyIndex2020 = async (index: number) => {
  const results = await pool.query("SELECT * FROM gluto_2020;");
  return results.rows;
};

export const getEntries2021 = async () => {
  const results = await pool.query("SELECT * FROM gluto_2021;");
  return results.rows;
};

export const getEntrybyIndex2021 = async (index: number) => {
  const results = await pool.query("SELECT * FROM gluto_2021;");
  return results.rows;
};

export const getEntries2023 = async () => {
  const results = await pool.query("SELECT * FROM gluto_2023;");
  return results.rows;
};

export const getEntrybyIndex2023 = async (index: number) => {
  const results = await pool.query("SELECT * FROM gluto_2023;");
  return results.rows;
};