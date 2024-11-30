LARAVEL - BE: (rest api)
- composer create-project laravel/laravel:^9.0 example-app
- composer require laravel/passport
-  artisan key:generate

//EDIT .env file

- php artisan migrate
- php artisan passport:install

// Make the AuthController

- php artisan serve