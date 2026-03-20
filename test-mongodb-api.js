const http = require('http');

const baseURL = 'http://localhost:3000';

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseURL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(responseData),
            headers: res.headers
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: responseData,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Running MongoDB Booking API Tests...\n');

  let createdBookingId = null;

  try {
    // Test 1: Root endpoint
    console.log('1️⃣  Testing GET /');
    let res = await makeRequest('/');
    console.log(`   Status: ${res.status}`);
    console.log(`   Response: ${res.data}\n`);

    // Test 2: Get all bookings (initially empty)
    console.log('2️⃣  Testing GET /api/bookings (Get all bookings)');
    res = await makeRequest('/api/bookings');
    console.log(`   Status: ${res.status}`);
    console.log(`   Count: ${res.data.count}`);
    console.log(`   Bookings: ${JSON.stringify(res.data.data, null, 2)}\n`);

    // Test 3: Create first booking
    console.log('3️⃣  Testing POST /api/bookings (Create first booking)');
    res = await makeRequest('/api/bookings', 'POST', {
      name: 'John Doe',
      email: 'john@example.com',
      event: 'Synergia Tech Talk',
      ticketType: 'Premium'
    });
    console.log(`   Status: ${res.status}`);
    console.log(`   Response: ${JSON.stringify(res.data, null, 2)}`);
    createdBookingId = res.data.data._id;
    console.log(`   Booking ID saved: ${createdBookingId}\n`);

    // Test 4: Create second booking
    console.log('4️⃣  Testing POST /api/bookings (Create second booking)');
    res = await makeRequest('/api/bookings', 'POST', {
      name: 'Jane Smith',
      email: 'jane@example.com',
      event: 'AI Workshop',
      ticketType: 'Standard'
    });
    console.log(`   Status: ${res.status}`);
    console.log(`   Message: ${res.data.message}\n`);

    // Test 5: Create third booking with same event
    console.log('5️⃣  Testing POST /api/bookings (Create third booking - same event)');
    res = await makeRequest('/api/bookings', 'POST', {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      event: 'Synergia Tech Talk',
      ticketType: 'VIP'
    });
    console.log(`   Status: ${res.status}`);
    console.log(`   Message: ${res.data.message}\n`);

    // Test 6: Get booking by ID
    console.log('6️⃣  Testing GET /api/bookings/:id (Get booking by ID)');
    res = await makeRequest(`/api/bookings/${createdBookingId}`);
    console.log(`   Status: ${res.status}`);
    console.log(`   Booking: ${JSON.stringify(res.data.data, null, 2)}\n`);

    // Test 7: Update booking
    console.log('7️⃣  Testing PUT /api/bookings/:id (Update booking)');
    res = await makeRequest(`/api/bookings/${createdBookingId}`, 'PUT', {
      ticketType: 'VIP'
    });
    console.log(`   Status: ${res.status}`);
    console.log(`   Message: ${res.data.message}`);
    console.log(`   Updated: ${JSON.stringify(res.data.data, null, 2)}\n`);

    // Test 8: Search by email
    console.log('8️⃣  Testing GET /api/bookings/search/email?email=jane (Search by email)');
    res = await makeRequest('/api/bookings/search/email?email=jane');
    console.log(`   Status: ${res.status}`);
    console.log(`   Count: ${res.data.count}`);
    console.log(`   Results: ${JSON.stringify(res.data.data, null, 2)}\n`);

    // Test 9: Filter by event
    console.log('9️⃣  Testing GET /api/bookings/filter/event?event=Synergia (Filter by event)');
    res = await makeRequest('/api/bookings/filter/event?event=Synergia');
    console.log(`   Status: ${res.status}`);
    console.log(`   Count: ${res.data.count}`);
    console.log(`   Results: ${JSON.stringify(res.data.data, null, 2)}\n`);

    // Test 10: Filter by ticket type
    console.log('🔟 Testing GET /api/bookings/filter/ticketType?ticketType=VIP (Filter by ticket type)');
    res = await makeRequest('/api/bookings/filter/ticketType?ticketType=VIP');
    console.log(`   Status: ${res.status}`);
    console.log(`   Count: ${res.data.count}`);
    console.log(`   Results: ${JSON.stringify(res.data.data, null, 2)}\n`);

    // Test 11: Validation - missing required field
    console.log('1️⃣1️⃣  Testing POST /api/bookings (Validation - missing name)');
    res = await makeRequest('/api/bookings', 'POST', {
      email: 'test@example.com',
      event: 'Test Event'
    });
    console.log(`   Status: ${res.status}`);
    console.log(`   Message: ${res.data.message}\n`);

    // Test 12: Get all bookings (after operations)
    console.log('1️⃣2️⃣  Testing GET /api/bookings (Get all bookings - final)');
    res = await makeRequest('/api/bookings');
    console.log(`   Status: ${res.status}`);
    console.log(`   Total Count: ${res.data.count}\n`);

    // Test 13: Delete booking
    console.log('1️⃣3️⃣  Testing DELETE /api/bookings/:id (Delete booking)');
    res = await makeRequest(`/api/bookings/${createdBookingId}`, 'DELETE');
    console.log(`   Status: ${res.status}`);
    console.log(`   Message: ${res.data.message}\n`);

    // Test 14: Get all bookings after deletion
    console.log('1️⃣4️⃣  Testing GET /api/bookings (Get all bookings - after deletion)');
    res = await makeRequest('/api/bookings');
    console.log(`   Status: ${res.status}`);
    console.log(`   Total Count: ${res.data.count}\n`);

    console.log('✅ All tests completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Wait a moment for server to start, then run tests
setTimeout(runTests, 2000);
