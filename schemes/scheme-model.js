const db = require("../data/dbConfig");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};
// Working
function find() {
  return db("schemes");
}

// Working
function findById(id) {
  return db("schemes").where({ id }).first();
}

// Working
function findSteps(scheme_id) {
  return db()
    .select("*", "scheme_name")
    .from("steps as st")
    .where({ scheme_id })
    .join("schemes as sc", "st.scheme_id", "sc.id")
    .orderBy("st.step_number");
}

// Working

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then((ids) => {
      return findById(ids[0]);
    });
}

// Working
function update(changes, id) {
  return db("schemes").where({ id }).update(changes);
}

// Working
function remove(id) {
  return db("schemes").where({ id }).del();
}
