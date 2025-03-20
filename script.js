const weatherContainer = document.querySelector("#weatherContainer");
const weatherResult = document.querySelector("#weatherResult");

async function getWeather() {
    const apiKey = "905ab7068aa7414c800112023251402"; // API kalit
    const city = document.getElementById("city").value.trim(); // Trim bilan bo'sh joylarni olib tashlash

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            alert(data.error.message);
            return;
        }

        // HTML-ni tozalash
        weatherContainer.innerHTML = "";

        // API dan ma'lumot olish
        const condition = data.current.condition.text;
        const tempC = data.current.temp_c;
        const iconUrl = data.current.condition.icon;

        // Yangi div yaratish
        const div = document.createElement("div");
        div.innerHTML = `
            <p><strong>City:</strong> ${city}</p>
            <p><strong>Temperature:</strong> ${tempC}°C</p>
            <p><strong>Condition:</strong> ${condition}</p>
            <img src="https:${iconUrl}" alt="Weather icon">
        `;

        weatherContainer.appendChild(div);
    } catch (error) {
        console.log("Error:", error);
        alert("Failed to fetch weather data.");
    }
}
