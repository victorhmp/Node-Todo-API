const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// seed data
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

// wipe the database before running each test
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new Todo', (done) => {
        var text = 'Test todo text';

        request(app)
           .post('/todos')
           .send({text})
           .expect(200)
           .expect((res) => {
                expect(res.body.text).toBe(text); 
            })
            .end((err, resp) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        var testText = "";

        request(app)
            .post('/todos')
            .send({testText})
            .expect(400)
            .end((err, resp) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });
    it('should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID('5ab2ef2b6912b5287eae1176').toHexString()}`)
            .expect(404)
            .end(done);
    });
    it('should return a 404 for non-object IDs', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    })
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        let hexId = todos[1]._id.toHexString();

        request(app)
          .delete(`/todos/${hexId}`)
          .expect(200)
          .expect((res) => {
              expect(res.body.todo._id).toBe(hexId);
          })
          .end((error, resp) => {
            if(error)
                return done(err);

            Todo.findById(hexId).then((todo) => {
                expect(todo).toNotExist;
                done();
            }).catch((e) => done(e));
          });
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .delete(`/todos/${new ObjectID('5ab2ef2b6912b5287eae1176').toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        let hexId = new ObjectID().toHexString();
        
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it ('should update the todo', (done) => {
        let hexId = todos[0]._id.toHexString();
        
        request(app)
            .patch(`/todos/${hexId}`)
            .send({text: 'I was updated', completed: true})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe('I was updated');
                expect(res.body.todo.completed).toBe(true);
                expect(typeof(res.body.todo.completedAt)).toBe('number');
            })
            .end(done);
    });

    it ('should clear completedAt when todo is not completed', (done) => {
        let hexId = todos[1]._id.toHexString();
        
        request(app)
            .patch(`/todos/${hexId}`)
            .send({text: 'I was updated', completed: false})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe('I was updated');
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeFalsy();
            })
            .end(done);
    });
});