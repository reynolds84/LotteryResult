const SUPABASE_URL = "https://cjwkmtqpzvkpxjlfcyzg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqd2ttdHFwenZrcHhqbGZjeXpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNDEwMDMsImV4cCI6MjA3NTYxNzAwM30.vFwABypAsnw15vMpo3_A--ayRwUkq6iQJYUXBbbQxs8";

fetch(`${SUPABASE_URL}/rest/v1/resultados?select=*`, {
    headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
    }
})
.then(r => r.json())
.then(data => {
    let html = "";
    data.forEach(x => {
        html += `<p>${x.fecha} - ${x.pick3}: ${x.pick4}</p>`;
    });
    document.getElementById("resultados").innerHTML = html;
});

