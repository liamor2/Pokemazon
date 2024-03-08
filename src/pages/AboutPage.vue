<template>
    <HeaderComponent />
    <main>
        <h1>About us</h1>
        <article>
            <h2>What is Pokemazon</h2>
            <p>
                Pokemazon is a pioneering entity within the Pokémon universe, established in 2013 by a visionary group of Pokémon trainers. These founders identified a unique opportunity to enhance the Pokémon trading experience by leveraging the digital space. The company is dedicated to the sale and delivery of Pokémon to trainers worldwide, providing an innovative, secure, and user-friendly platform. With a commitment to customer satisfaction and Pokémon welfare, Pokemazon quickly rose to prominence, becoming the go-to destination for trainers looking to complete their collections or find the perfect Pokémon companion.
            </p>
            <p>
                Pokemazon differentiates itself through a rigorous Pokémon care standard, ensuring all creatures are healthy, happy, and ethically sourced before they are listed on the platform. The company also offers a wide range of services, including rare Pokémon finds, custom training programs, and direct delivery services that employ flying Pokémon for a swift and safe transfer. This dedication to quality and service has not only garnered a loyal customer base but has also set new standards within the Pokémon trading community.  
            </p>
        </article>
        <article>
            <h2>History of the Company</h2>
            <p>
                The inception of Pokemazon dates back to a simple yet revolutionary idea shared among friends. The founders, once competitive Pokémon trainers themselves, experienced firsthand the challenges and limitations of traditional Pokémon trading. They envisioned a platform that could overcome geographical barriers and connect trainers from all corners of the Pokémon universe.
            </p>
            <p>
                After months of planning, development, and collaboration with Pokémon breeders, veterinarians, and tech experts, Pokemazon was launched. The initial response was overwhelmingly positive, with trainers appreciating the convenience and breadth of options available. As the company grew, so did its reputation for responsible trading and exceptional care for Pokémon.
            </p>
            <p>
                The journey wasn't without its challenges, however. Pokemazon faced scrutiny from Pokémon conservation groups and regulatory bodies, prompting the company to lead the industry in ethical trading standards and transparency. These efforts not only improved the industry as a whole but also solidified Pokemazon's role as a trusted leader in the Pokémon community.
            </p>
        </article>
        <article>
            <h2>Our Mission</h2>
            <p>
                Pokemazon's mission is to provide trainers with a safe, reliable, and enjoyable platform for trading Pokémon. The company is committed to fostering a community of responsible trainers who prioritize the well-being of Pokémon and the integrity of the trading process. Pokemazon aims to be the ultimate destination for trainers seeking rare, high-quality Pokémon and a supportive network of fellow enthusiasts.
            </p>
        </article>
        <article>
            <h2>List of Future Objectives</h2>
            <ul>
                <li><strong>Sustainability and Ethics:</strong> Strengthening efforts to ensure all Pokémon are sourced in a sustainable and ethical manner, working closely with environmental and Pokémon welfare organizations.</li>
                <li><strong>Global Expansion:</strong> Expanding the delivery network to reach even the most remote trainers, ensuring everyone has access to the Pokémon marketplace.</li>
                <li><strong>Technological Innovation:</strong> Developing new technologies to improve the Pokémon transfer process, making it faster, safer, and more efficient for both trainers and Pokémon.</li>
                <li><strong>Community Engagement:</strong> Increasing community engagement through events, competitions, and partnerships, fostering a sense of belonging and camaraderie among trainers worldwide.</li>
                <li><strong>Educational Programs:</strong> Launching educational programs to promote responsible Pokémon training and trading practices, ensuring trainers are well-informed and equipped for their journey.</li>
            </ul>
        </article>
        <article>
            <h2>Our Team</h2>
            <p>
                The Pokemazon team is comprised of passionate Pokémon trainers, tech experts, and Pokémon care specialists. Each member of the team brings a unique set of skills and experiences to the table, contributing to the company's success and growth. The team is dedicated to upholding the values of Pokemazon and ensuring that every trainer's experience is memorable and rewarding.
            </p>
            <img src="../assets/team.png" alt="Pokemazon Team" />
        </article>
    </main>
    <FooterComponent />
</template>

<script setup>
import { ref } from 'vue'
import HeaderComponent from '../components/header.vue'
import FooterComponent from '../components/footer.vue'
</script>

<style lang="scss" scoped>
main {
    text-align: center;
    margin: 100px 15%;
    width: 70%;
    background-color: #f2f2f2;
    padding: 20px;
    border-radius: 10px;
    article {
        margin: 20px 0;
        h2 {
            margin: 10px 0;
            font-size: 24px;
        }
        p {
            text-align: left;
            margin: 10px 0;
            font: 16px;
        }
        ul {
            text-align: left;
            margin: 10px 0;
            li {
                margin: 5px 0;
                list-style: none;
            }
        }
        img {
            width: 100%;
            border-radius: 10px;
        }
    }
}
</style>