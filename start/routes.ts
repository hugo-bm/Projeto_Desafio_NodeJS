/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // Routes for Teachers

  Route.get('/teacher/:matricula', 'TeachersController.show')
  Route.post('/teacher/create', 'TeachersController.store')
  Route.post('/teacher/edit', 'TeachersController.update')
  Route.delete('/teacher/delete', 'TeachersController.destroy')

  // Routes for Students

  Route.get('/student/:matricula', 'StudentsController.show')
  Route.post('/student/create', 'StudentsController.store')
  Route.post('/student/edit', 'StudentsController.update')
  Route.delete('/student/delete', 'StudentsController.destroy')

  // Routes for classrooms

  Route.get('/classroom/student/:matricula', 'ClassroomsController.studentAllClassroom')
  Route.get('/classroom/:matricula/:numero', 'ClassroomsController.show')
  Route.post('/classroom/create', 'ClassroomsController.store')
  Route.post('/classroom/update', 'ClassroomsController.update')
  Route.delete('/classroom/delete', 'ClassroomsController.destroy')
  Route.post('/classroom/alloc', 'ClassroomsController.alloc')
  Route.post('/classroom/deallocate', 'ClassroomsController.deallocate')
  Route.get(
    '/classroom/allStudents/:matricula/:numero',
    'ClassroomsController.allStudentsOnClassroom'
  )
}).prefix('api')
