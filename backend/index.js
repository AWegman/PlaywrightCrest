const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Hier importeren we de database-stekker

const app = express();
app.use(cors());
app.use(express.json());

// Route om een nieuwe wedstrijd toe te voegen
app.post('/api/wedstrijden', async (req, res) => {
  try {
    const { naam, datum, afstand_km, tijd, categorie, is_pr } = req.body;
    const afstandNum = afstand_km !== undefined && afstand_km !== null ? Number(afstand_km) : null;
    const newWedstrijd = await pool.query(
      'INSERT INTO wedstrijden (naam, datum, afstand_km, tijd, categorie, is_pr) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [naam, datum, afstandNum, tijd, categorie, is_pr]
    );
    res.json(newWedstrijd.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server fout");
  }
});

// Nieuwe route die de wedstrijden uit de database haalt
app.get('/api/wedstrijden', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM wedstrijden ORDER BY datum DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server fout");
  }
});

// Route om een wedstrijd bij te werken (bijv. tijd toevoegen)
app.put('/api/wedstrijden/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { naam, datum, afstand_km, tijd, categorie, is_pr } = req.body;
    const afstandNum = afstand_km !== undefined && afstand_km !== null ? Number(afstand_km) : null;
    const updateWedstrijd = await pool.query(
      'UPDATE wedstrijden SET naam = $1, datum = $2, afstand_km = $3, tijd = $4, categorie = $5, is_pr = $6 WHERE id = $7 RETURNING *',
      [naam, datum, afstandNum, tijd, categorie, is_pr, id]
    );

    res.json(updateWedstrijd.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server fout bij bijwerken");
  }
});

// Route om een wedstrijd te verwijderen
app.delete('/api/wedstrijden/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM wedstrijden WHERE id = $1', [id]);
    res.json({ message: "Wedstrijd verwijderd!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server fout bij verwijderen");
  }
});

app.listen(5000, () => {
  console.log("Server draait op poort 5000 en is verbonden met Postgres!");
});