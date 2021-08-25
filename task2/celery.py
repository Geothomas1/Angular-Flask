from celery import Celery
app = Celery('task2', broker='amqp://localhost',
             backend='rpc://localhost', include=['task2.tasks'])
app.conf.update(
    result_expires=3600,
)
if __name__ == '__main__':
    app.start()
