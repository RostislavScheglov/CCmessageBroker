# C&C Message broker API`s

## Getting Started

### Install npm

This project uses `npm` as the package manager. You can install it by following the instructions on the [npm website](https://www.npmjs.com/get-npm).

### Install Docker

This projects needs Docker to run it locally follows the (https://www.docker.com/)

 All commands below need to be perform from the root folders of API`s

### Intermediar-api
1. In order for this project to work you will need `.env.` file in your root folder. Contact owner for it.
2. Run `npm install` to install dependencies
3. Run `npm run start` to start development
4. The app will be ready at http://localhost:4000

### Notify-user-api
1. In order for this project to work you will need `.env.` file in your root folder. Contact owner for it.
2. Run `npm install` to install dependencies
3. Run `npm run start` to start development
4. The app will be ready at http://localhost:5000

### RabbitMq
1. In order for this project to work you will need `.env.` file in your root folder. Contact owner for it.
2. Run `docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq`. 

This command will 
`-d`: Runs the container in detached mode (in the background).

``--name rabbitmq``: Assigns the name rabbitmq to the container.

``-p 5672:5672``: Maps port 5672 on the host to port 5672 in the container (AMQP port).

``-p 15672:15672``: Maps port 15672 on the host to port 15672 in the container (Management UI port).

``rabbitmq``: Specifies the image to use.



## Testing 

After all was done you can use service like https://www.postman.com/ to imitate registration requests with user info in them, send `POST` requests to `Intermediar-api` that will listen to them, will create user in the Data Base.

After successful user creation `Intermediar-api` will produce message with user data to the specific topic of the `RabbitMq` service.

`Notify-user-api` currently subscribed to same topic of the `RabbitMq` and will consume message with the user data and will sends greeting message to the user EMAIL.

