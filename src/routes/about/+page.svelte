<script>
    // You can add any necessary imports or logic here
</script>

<svelte:head>
    <title>About Us | My SvelteKit App</title>
    <meta name="description" content="Learn more about our company and mission">
</svelte:head>

<nav class="nav-back">
    <a href="/">← Back to Home</a>
</nav>

<div class="about-container">
    <h1>About Us</h1>
    
    <section class="mission">
        <h2>Our Mission</h2>
        <p>We are dedicated to creating innovative solutions that make a difference in people's lives. Our team works tirelessly to deliver high-quality products and exceptional service.</p>
    </section>

    <section class="team">
        <h2>Our Team</h2>
        <div class="team-grid">
            <div class="team-member">
                <h3>John Doe</h3>
                <p>Founder & CEO</p>
            </div>
            <div class="team-member">
                <h3>Jane Smith</h3>
                <p>Lead Developer</p>
            </div>
            <div class="team-member">
                <h3>Mike Johnson</h3>
                <p>Design Director</p>
            </div>
        </div>
    </section>

    <section class="contact">
        <h2>Get in Touch</h2>
        <p>Have questions? We'd love to hear from you. Send us a message at <a href="mailto:contact@example.com">contact@example.com</a></p>
    </section>
</div>

<style>
    .about-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    h1 {
        font-size: 2.5rem;
        color: #333;
        margin-bottom: 2rem;
    }

    section {
        margin-bottom: 3rem;
    }

    h2 {
        color: #444;
        margin-bottom: 1rem;
    }

    .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-top: 1.5rem;
    }

    .team-member {
        background: #f5f5f5;
        padding: 1.5rem;
        border-radius: 8px;
        text-align: center;
    }

    .team-member h3 {
        margin: 0;
        color: #333;
    }

    .team-member p {
        margin: 0.5rem 0 0;
        color: #666;
    }

    .contact {
        background: #f9f9f9;
        padding: 2rem;
        border-radius: 8px;
        text-align: center;
    }

    a {
        color: #0066cc;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    .nav-back {
        padding: 1rem 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .nav-back a {
        display: inline-flex;
        align-items: center;
        color: #0066cc;
        text-decoration: none;
        font-weight: 500;
    }

    .nav-back a:hover {
        text-decoration: underline;
    }
</style>



