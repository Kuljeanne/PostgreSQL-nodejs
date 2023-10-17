const db = require('../db');

class UserController {
  async createUser(req, res) {
    const { login } = req.body;
    // все взаимодействия с бд ассинхронные поэтому пишем await
    // RETURNING говорит что после создания функция вернет пользователя,
    // если ретернинг не написать роус будет пустой массив
    const newPerson = await db.query(
      'INSERT INTO person (login) values ($1) RETURNING *',
      [login]
    );
    res.json(newPerson.rows[0]);
  }
  async getUser(req, res) {
    const id = req.params.id;
    const user = await db.query('SELECT * FROM person where id = $1', [id]);
    res.json(user.rows[0]);
  }
  async getUsers(req, res) {
    const users = await db.query('SELECT * FROM person');

    res.json(users.rows);
  }
  async updateUser(req, res) {
    const { id, login } = req.body;
    const user = await db.query(
      'UPDATE person set login = $1 where id = $2 RETURNING *',
      [login, id]
    );

    res.json(user.rows[0]);
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    const user = await db.query('DELETE FROM person where id = $1', [id]);

    res.json(user.rows[0]);
  }
}

module.exports = new UserController();
