// ============================================================================
// ADMIN CORE CONTROL NODE
// ============================================================================
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const authGate = document.getElementById('auth-gate');
const dashboardEngine = document.getElementById('dashboard-engine');
const updateForm = document.getElementById('matrix-update-form');

// Check active session status instantly on load
document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        revealDashboard();
    }
});

// Authentication Validation Route
document.getElementById('btn-login').addEventListener('click', async () => {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("Authentication Engine Rejection: " + error.message);
    } else {
        revealDashboard();
    }
});

// Session Termination Route
document.getElementById('btn-logout').addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
    location.reload();
});

// Pull current values from table to populate input slots
async function revealDashboard() {
    authGate.classList.add('auth-hidden');
    dashboardEngine.classList.remove('auth-hidden');

    try {
        const { data, error } = await supabaseClient
            .from('landing_page_data')
            .select('*')
            .single();

        if (error) throw error;
        if (!data) return;

        // Populate fields safely
        document.getElementById('db-countdown').value = data.countdown_target || '';
        document.getElementById('db-date1').value = data.insight_1_date || '';
        document.getElementById('db-title1').value = data.insight_1_title || '';
        document.getElementById('db-body1').value = data.insight_1_body || '';
        document.getElementById('db-title2').value = data.insight_2_title || '';
        document.getElementById('db-prize2').value = data.insight_2_prize || '';
        document.getElementById('db-body2').value = data.insight_2_body || '';
        document.getElementById('db-comp-status').value = data.comp_card_status || '';
        document.getElementById('db-comp-title').value = data.comp_card_title || '';
        document.getElementById('db-comp-desc').value = data.comp_card_desc || '';
        document.getElementById('db-comp-prize').value = data.comp_card_prize || '';

    } catch (err) {
        console.error("Failed to compile dashboard baseline values:", err.message);
    }
}

// Push edits back to database row via submit vector
updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();

const updatedPayload = {
        countdown_target: document.getElementById('db-countdown').value,
        insight_1_date: document.getElementById('db-date1').value,
        insight_1_title: document.getElementById('db-title1').value,
        insight_1_body: document.getElementById('db-body1').value,
        insight_2_title: document.getElementById('db-title2').value,
        insight_2_prize_status: document.getElementById('db-prize2').value, // Explicitly mapped to your full column name
        insight_2_body: document.getElementById('db-body2').value,
        comp_card_status: document.getElementById('db-comp-status').value,
        comp_card_title: document.getElementById('db-comp-title').value,
        comp_card_desc: document.getElementById('db-comp-desc').value,
        comp_card_prize: document.getElementById('db-comp-prize').value,
    };

    // Updates row where ID is 1 (assumes your landing page data uses row ID 1)
    const { error } = await supabaseClient
        .from('landing_page_data')
        .update(updatedPayload)
        .eq('id', 1);

    if (error) {
        alert("Commit Phase Fault: " + error.message);
    } else {
        alert("DATABASE CORE METRICS UPDATED SUCCESSFULLY.");
    }
});