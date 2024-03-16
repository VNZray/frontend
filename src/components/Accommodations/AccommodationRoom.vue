<script setup>
import CapacityIcon from './icons/CapacityIcon.vue';
import WifiIcon from './icons/WifiIcon.vue';
import BedIcon from './icons/BedIcon.vue';
import TvIcon from './icons/TvIcon.vue';
import AirconIcon from './icons/AirconIcon.vue';


const getIconComponent = (alt) => {
    switch (alt) {
        case 'Capacity':
            return CapacityIcon;
        case 'Wifi':
            return WifiIcon;
        case 'Bed':
            return BedIcon;
        case 'Tv':
            return TvIcon;
        case 'Aircon':
            return AirconIcon;
        default:
            return null;
    }
};

</script>

<template>
    <div class="room-container">

        <div class="content-title">
            <h1>Rooms</h1>
        </div>

        <section>
            <article v-for="(room, index) in rooms" :key="index">
                <div :class="'room-image image' + (index + 1)">
                    <h4 class="room-type">{{ room.type }}</h4>
                </div>

                <div class="room-info">
                    <div class="details">
                        <h3 class="room-no">{{ room.number }}</h3>
                        <div class="room-details">
                            <div v-for="(detail, dIndex) in room.details" :key="dIndex" :class="'rd-' + (dIndex + 1)">
                                <component :is="getIconComponent(detail.alt)" />
                                <p>{{ detail.text }}</p>
                            </div>
                        </div>
                    </div>
                    <h4 class="room-price">{{ room.price }}</h4>
                </div>
            </article>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rooms: [
                {
                    id: 1,
                    type: 'Family Room',
                    number: 'Room 1',
                    details: [
                        { icon: '', alt: 'Capacity', text: 'Capacity: 6-8 person' },
                        { icon: '', alt: 'Bed', text: '3 bed 1 extra bed' },
                        { icon: '', alt: 'Aircon', text: 'Aircon' },
                        { icon: '', alt: 'Tv', text: 'TV with cable' },
                        { icon: '', alt: 'Wifi', text: 'Free WI-FI' }
                    ],
                    price: '2,200.00 PHP'
                },
                {
                    id: 2,
                    type: 'Family Room',
                    number: 'Room 2',
                    details: [
                        { icon: '', alt: 'Capacity', text: 'Capacity: 6-8 person' },
                        { icon: '', alt: 'Bed', text: '3 bed 1 extra bed' },
                        { icon: '', alt: 'Aircon', text: 'Aircon' },
                        { icon: '', alt: 'Tv', text: 'TV with cable' },
                        { icon: '', alt: 'Wifi', text: 'Free WI-FI' }
                    ],
                    price: '2,200.00 PHP'
                },
                {
                    id: 3,
                    type: 'Family Room',
                    number: 'Room 3',
                    details: [
                        { icon: '', alt: 'Capacity', text: 'Capacity: 6-8 person' },
                        { icon: '', alt: 'Bed', text: '3 bed 1 extra bed' },
                        { icon: '', alt: 'Aircon', text: 'Aircon' },
                        { icon: '', alt: 'Tv', text: 'TV with cable' },
                        { icon: '', alt: 'Wifi', text: 'Free WI-FI' }
                    ],
                    price: '2,200.00 PHP'
                },
                {
                    id: 4,
                    type: 'Family Room',
                    number: 'Room 4',
                    details: [
                        { icon: '', alt: 'Capacity', text: 'Capacity: 6-8 person' },
                        { icon: '', alt: 'Bed', text: '3 bed 1 extra bed' },
                        { icon: '', alt: 'Aircon', text: 'Aircon' },
                        { icon: '', alt: 'Tv', text: 'TV with cable' },
                        { icon: '', alt: 'Wifi', text: 'Free WI-FI' }
                    ],
                    price: '2,200.00 PHP'
                },
                {
                    id: 5,
                    type: 'Family Room',
                    number: 'Room 5',
                    details: [
                        { icon: '', alt: 'Capacity', text: 'Capacity: 6-8 person' },
                        { icon: '', alt: 'Bed', text: '3 bed 1 extra bed' },
                        { icon: '', alt: 'Aircon', text: 'Aircon' },
                        { icon: '', alt: 'Tv', text: 'TV with cable' },
                        { icon: '', alt: 'Wifi', text: 'Free WI-FI' }
                    ],
                    price: '2,200.00 PHP'
                },
                {
                    id: 6,
                    type: 'Family Room',
                    number: 'Room 6',
                    details: [
                        { icon: '', alt: 'Capacity', text: 'Capacity: 6-8 person' },
                        { icon: '', alt: 'Bed', text: '3 bed 1 extra bed' },
                        { icon: '', alt: 'Aircon', text: 'Aircon' },
                        { icon: '', alt: 'Tv', text: 'TV with cable' },
                        { icon: '', alt: 'Wifi', text: 'Free WI-FI' }
                    ],
                    price: '2,200.00 PHP'
                },
                {
                    id: 7,
                    type: 'Family Room',
                    number: 'Room 7',
                    details: [
                        { icon: '', alt: 'Capacity', text: 'Capacity: 6-8 person' },
                        { icon: '', alt: 'Bed', text: '3 bed 1 extra bed' },
                        { icon: '', alt: 'Aircon', text: 'Aircon' },
                        { icon: '', alt: 'Tv', text: 'TV with cable' },
                        { icon: '', alt: 'Wifi', text: 'Free WI-FI' }
                    ],
                    price: '2,200.00 PHP'
                },



            ]
        };
    },
    methods: {

    }
};
</script>


<style scoped>
.room-image.image1 {
    background-image: url('./rooms/1.png');
    background-size: cover;
    background-repeat: no-repeat;
}

.room-image.image2 {
    background-image: url('./rooms/2.png');
    background-size: cover;
    background-repeat: no-repeat;
}

.room-image.image3 {
    background-image: url('./rooms/3.png');
    background-size: cover;
    background-repeat: no-repeat;
}

.room-image.image4 {
    background-image: url('./rooms/4.png');
    background-size: cover;
    background-repeat: no-repeat;
}

.room-image.image5 {
    background-image: url('./rooms/5.png');
    background-size: cover;
    background-repeat: no-repeat;
}

.room-image.image6 {
    background-image: url('./rooms/6.png');
    background-size: cover;
    background-repeat: no-repeat;
}

.room-image.image7 {
    background-image: url('./rooms/7.png');
    background-size: cover;
    background-repeat: no-repeat;
}

.content-title {
    padding: 0 0 0 265px;
}

.details {
    width: 100%;
    height: 83%;
}

section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

}

section article {
    display: flex;
    width: 610px;
    height: 320px;
    flex-shrink: 0;
    margin: 50px;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

[class^="room-image"],
[class^="room-info"] {
    width: 50%;
    height: 100%;
}

[class^="room-type"],
[class^="room-price"] {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    border-radius: 0 0 0 10px;
}

.room-price {
    border-radius: 0 0 10px 0;
    background-color: #1E4E72;
}

.room-no {
    color: #1E4E72;
    text-align: center;
    margin: 15px;
}

[class^="room-image"] {
    border-radius: 10px 0 0 10px;
    background-color: #1E4E72;
    display: flex;
    align-items: end;
}

[class^="room-info"] {
    display: flex;
    align-items: end;
    flex-wrap: wrap;
    border-radius: 0 10px 10px 0;
}

[class^="rd-"] {
    padding-left: 20px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 10px;
}

[class^="rd-"] p {
    font-size: 16px;
    margin: 0;
    color: #1E4E72;
    font-weight: 700;
}
</style>
