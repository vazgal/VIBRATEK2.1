const { supabase } = require("../lib/supabase");

module.exports = async (req, res) => {
  if (!supabase) return res.status(503).json({ error: "Supabase no configurado" });

  if (req.method === "GET") {
    const { data, error } = await supabase.from("orders").select("*").order("id", { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data || []);
  }

  if (req.method === "POST") {
    const newOrder = req.body;
    const { data, error } = await supabase.from("orders").insert(newOrder).select().single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ message: "Orden creada con éxito", data });
  }

  return res.status(405).json({ error: "Method not allowed" });
};
