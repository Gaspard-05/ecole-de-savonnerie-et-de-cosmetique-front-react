import { useEffect, useState } from "react";
import axios from "axios";
import api, { API_BASE_URL } from "../lib/api";

// Hook générique pour appeler l'API Laravel.
// Tant que le fallback est fourni, il est retourné immédiatement (données mockées)
// et l'appel réseau réel prend le relais dès que l'API est disponible.

export function useFetch(endpoint, { fallback = null, enabled = true } = {}) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(enabled && !!API_BASE_URL);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !API_BASE_URL) return;

    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const res = await api.get(endpoint, { signal: controller.signal });
        setData(res.data);
      } catch (err) {
        if (!axios.isCancel(err) && err.code !== "ERR_CANCELED") setError(err);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [endpoint, enabled]);

  return { data, loading, error };
}

export async function postJSON(endpoint, payload) {
  if (!API_BASE_URL) {
    // Pas d'API branchée : on simule un succès pour permettre de tester le parcours.
    return new Promise((resolve) => setTimeout(() => resolve({ ok: true, mocked: true }), 600));
  }

  const res = await api.post(endpoint, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}
