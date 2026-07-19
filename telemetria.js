const { writeTelemetry } = require("../lib/influx");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { asset_id, vibracion, temperatura } = req.body;
  if (!asset_id) return res.status(400).json({ error: "Falta asset_id" });

  console.log(`📡 Telemetría -> Equipo: ${asset_id} | Vib: ${vibracion} | Temp: ${temperatura}`);

  const saved = writeTelemetry(asset_id, vibracion, temperatura);
  if (!saved) {
    return res.status(200).json({ message: "Recibido, pero InfluxDB no está configurado" });
  }

  return res.status(200).json({ message: "Dato recibido y guardado correctamente" });
};
