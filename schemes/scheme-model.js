const db = require("../data/dbConfig");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};
// Working - return all schemes
function find() {
  return db("schemes");
}

// Working - return specific scheme by id
function findById(id) {
  return db("schemes").where({ id }).first();
}

// Working - return all steps by scheme id
function findSteps(scheme_id) {
  return db()
    .select("*", "scheme_name")
    .from("steps as st")
    .where({ scheme_id })
    .join("schemes as sc", "st.scheme_id", "sc.id")
    .orderBy("st.step_number");
}

// Working - add new step to scheme and return

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then((ids) => {
      return findById(ids[0]);
    });
}

// Working - update scheme and return
function update(id, changes) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

// Working - remove a scheme a id
function remove(id) {
  return db("schemes").where({ id }).del();
}
