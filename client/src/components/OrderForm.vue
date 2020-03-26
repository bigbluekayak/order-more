<template>
    <div>
        <div v-if="error">
            <h4 class="alert-heading" style="color:red;">Error!</h4>
            <p class="mb-0">{{error}}</p>
        </div>

        <form @submit.prevent="addOrder">
            <p>
                <label for="name">Name: </label>
                <input type="text" name="name" id="name" v-model="order.name">
            </p>
            <p>
                <label for="email">Email: </label>
                <input type="email" name="email" id="email" v-model="order.email">
            </p>
            <p>
                <label for="telephone">Telephone: </label>
                <input type="tel" name="telephone" id="telephone" v-model="order.telephone">
            </p>
            <p>
                <label for="address">Address: </label>
                <input type="text" name="address" id="address" v-model="order.address">
            </p>
            <p>
                <label for="town">Town: </label>
                <input type="text" name="town" id="town" v-model="order.town">
            </p>
            <input type="submit">
        </form>
    </div>
</template>

<script>
    const API_URL = 'http://localhost:4000/api';

    export default {
        name: 'OrderForm',
        data: () => ({
            error: '',
            order: {
                name: '',
                email: '',
                telephone: '',
                address: '',
                town: ''
            }
        }),
        methods: {
            addOrder() {
                console.log(this.order);
                fetch(API_URL, {
                    method: 'POST',
                    body: JSON.stringify(this.order),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(result => {
                    if(result.details) {
                        const error = result.details
                            .map(detail => detail.message)
                            .join('. ')
                        this.error = error;
                    } else {
                        this.error = '';

                    }
                });

            }
        }
    };
</script>