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
  console.log('🧪 Running API Tests...\n');

  try {
    // Test 1: Root endpoint
    console.log('1️⃣  Testing GET /');
    let res = await makeRequest('/');
    console.log(`   Status: ${res.status}`);
    console.log(`   Response: ${res.data}\n`);

    // Test 2: Get all events
    console.log('2️⃣  Testing GET /events');
    res = await makeRequest('/events');
    console.log(`   Status: ${res.status}`);
    console.log(`   Events: ${JSON.stringify(res.data, null, 2)}\n`);

    // Test 3: Get specific event
    console.log('3️⃣  Testing GET /event/1');
    res = await makeRequest('/event/1');
    console.log(`   Status: ${res.status}`);
    console.log(`   Event: ${JSON.stringify(res.data, null, 2)}\n`);

    // Test 4: Get all bookings
    console.log('4️⃣  Testing GET /api/bookings');
    res = await makeRequest('/api/bookings');
    console.log(`   Status: ${res.status}`);
    console.log(`   Bookings: ${JSON.stringify(res.data, null, 2)}\n`);

    // Test 5: Get specific booking
    console.log('5️⃣  Testing GET /api/bookings/1');
    res = await makeRequest('/api/bookings/1');
    console.log(`   Status: ${res.status}`);
    console.log(`   Booking: ${JSON.stringify(res.data, null, 2)}\n`);

    // Test 6: Create new event
    console.log('6️⃣  Testing POST /events/add');
    res = await makeRequest('/events/add', 'POST', {
      name: 'Hackathon 2025',
      date: '2025-11-15',
      location: 'Lab 2',
      capacity: 200
    });
    console.log(`   Status: ${res.status}`);
    console.log(`   Response: ${JSON.stringify(res.data, null, 2)}\n`);

    // Test 7: Create new booking
    console.log('7️⃣  Testing POST /api/bookings');
    res = await makeRequest('/api/bookings', 'POST', {
      eventId: 1,
      name: 'Alice',
      email: 'alice@example.com'
    });
    console.log(`   Status: ${res.status}`);
    console.log(`   Response: ${JSON.stringify(res.data, null, 2)}\n`);

    // Test 8: Update event
    console.log('8️⃣  Testing PUT /event/1');
    res = await makeRequest('/event/1', 'PUT', {
      capacity: 150
    });
    console.log(`   Status: ${res.status}`);
    console.log(`   Response: ${JSON.stringify(res.data, null, 2)}\n`);

    // Test 9: Update booking
    console.log('9️⃣  Testing PUT /api/bookings/1');
    res = await makeRequest('/api/bookings/1', 'PUT', {
      name: 'Chetan Updated',
      email: 'chetan.updated@example.com'
    });
    console.log(`   Status: ${res.status}`);
    console.log(`   Response: ${JSON.stringify(res.data, null, 2)}\n`);

    // Test 10: Delete event
    console.log('🔟 Testing DELETE /event/1');
    res = await makeRequest('/event/1', 'DELETE');
    console.log(`   Status: ${res.status}`);
    console.log(`   Response: ${JSON.stringify(res.data, null, 2)}\n`);

    console.log('✅ All tests completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

runTests();
