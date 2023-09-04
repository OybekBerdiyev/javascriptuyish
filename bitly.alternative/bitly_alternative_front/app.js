const form = document.getElementById('shorten-form');
const shorturlDiv = document.getElementById('shorturl');

form.addEventListener('submit', async (e) => {
    e.preventDefault();


    const url = form.elements.url.value;
    try {
        const response = await fetch('http://localhost:4000/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        if (response.status === 201) {
            const data = await response.json();
            shorturlDiv.innerHTML = `<p>Short URL: ${data.url}</p>`;
        } else {
            shorturlDiv.innerHTML = '<p>Error generating short URL.</p>';
        }
    } catch (error) {
        console.error(error);
        shorturlDiv.innerHTML = '<p>An error occurred.</p>';
    }
});
