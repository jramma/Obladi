export type LostObject = {
    _id?: string; // opcional porque Mongo lo asigna automáticamente
    title: string;
    description: string;
    tags: string[];
    category: string;
    email: string;
    location: string;
    latitude: number;
    longitude: number;
    date: string; // puede ser string (ISO) o Date si vas a convertirlo luego
    post_date: string;
    imgs: string[];
  };
  