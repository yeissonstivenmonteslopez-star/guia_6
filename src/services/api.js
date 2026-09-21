export const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const obtenerPlantilla = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`El servidor respondió con estado ${response.status}`);
  }

  return await response.json();
};

export const obtenerTablaPosiciones = async () => {
  const usuarios = await obtenerPlantilla();

  const tabla = usuarios.map((user) => {
    const pj = 10;
    const pg = Math.max(1, 10 - (user.id % 7));
    const pe = user.id % 3;
    const pp = pj - (pg + pe);
    const pts = pg * 3 + pe;

    return {
      id: user.id,
      equipo: user.company?.name || 'Club sin nombre',
      dt: user.name,
      pj,
      pg,
      pe,
      pp,
      pts,
    };
  });

  return tabla.sort((a, b) => b.pts - a.pts);
};
