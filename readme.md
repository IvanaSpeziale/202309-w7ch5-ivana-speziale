Week 7 - Challenge 1
API REST Things I already know / Lo que queráis (II)
Continuamos el API REST del Challenge anterior, que se conecte a un fichero JSON, para manipular recursos de tipo cosas que ya sé (o cualquier otro).

Recordemos que el JSON tendrá una sola propiedad de tipo array, donde almacenarán objetos que representarán cosas que hemos aprendido en el bootcamp (o cualquier otro modelo).

El modelo de datos estará representado como "entity" en una carpeta/fichero independiente.
El repositorio y el controller son clases que se instancian en el Router.
Les errores se controlan mediante un middleware de errores.
Se testa el 100% del backend.

---

Week 6 - Challenge 5
API REST Things I already know / Lo que queráis
Crea una API REST que se conecte a un fichero JSON, para manipular recursos de tipo cosas que ya sé. El JSON tendrá una sola propiedad de tipo array, donde almacenarán objetos que representarán cosas que hemos aprendido en el bootcamp.

La API REST debe tener los siguientes endpoints:

[GET] /things -> devuelve el array de cosas que ya sé

[GET] /things/:idThing -> devuelve una cosa que ya sé

[DELETE] /things/:idThing -> borra una cosa que ya sé

[POST] /things -> crea una cosa que ya sé (la recibe en el body)

[PATCH] /things/:id -> modifica una cosa que ya sé (la recibe en el body)

Usamos express con las capas:

app
router
controller
model
(opcional repo)
AÑADIMOS un front con REDUX testado

Lista de 'things'

Añadir 'thing'

Borrar 'thing'

Editar 'thing'

Página de detalle

---

Viajes: Registro de Lugares Favoritos

Permite a los usuarios registrar sus lugares favoritos para viajar.
Operaciones CRUD para agregar, ver, actualizar y eliminar lugares.
Campos: nombre del lugar, descripción, ubicación, fecha de visita, etc.
