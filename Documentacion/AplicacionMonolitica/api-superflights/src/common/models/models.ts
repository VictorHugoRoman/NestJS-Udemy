//aqui simplemente son las constantes con los nombres de las entidades o mdelos

export const USER = { name: 'users' };
export const PASSENGER = { name: 'passengers' };
export const FLIGHT = { name: 'flights' };

//Estos sirven para hacer referencia a los nombres de los modelos en nuestra apliacion
//como ejemplo podemos ver en el user.service al hacer un  InjectModel le mandamos el nombre del modelo q previamente
//se configuró en el user.module