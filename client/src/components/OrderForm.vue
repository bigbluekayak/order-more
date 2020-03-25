<template>
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
</template>

<script>
    const API_URL = '/api';

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