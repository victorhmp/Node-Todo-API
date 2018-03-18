const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// wipe the database before running each test
beforeEach((done) => {
    Todo.remove({}).then(() => done());
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

                Todo.find().then((todos) => {
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
});