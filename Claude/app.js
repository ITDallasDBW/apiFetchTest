        let userData = [];
        
        // Fetch data from API
        async function fetchData() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                userData = data;
                displayData(userData);
                
            } catch (error) {
                displayError('Failed to fetch data: ' + error.message);
            }
        }
        
        // Display data in HTML
        function displayData(data) {
            const container = document.getElementById('dataContainer');
            
            if (data.length === 0) {
                container.innerHTML = '<div class="loading">No data available</div>';
                return;
            }
            
            const html = data.map(user => `
                <div class="user-card">
                    <div class="user-name">${escapeHtml(user.name)}</div>
                    <div class="user-email">📧 ${escapeHtml(user.email)}</div>
                    <a href="http://${escapeHtml(user.website)}" class="user-website" target="_blank">
                        🌐 ${escapeHtml(user.website)}
                    </a>
                    <div class="user-company">${escapeHtml(user.company.name)}</div>
                </div>
            `).join('');
            
            container.innerHTML = html;
        }
        
        // Display error message
        function displayError(message) {
            const container = document.getElementById('dataContainer');
            container.innerHTML = `<div class="error">${escapeHtml(message)}</div>`;
        }
        
        // Escape HTML to prevent XSS
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        // Sort data based on selected criteria
        function sortData(criteria) {
            let sortedData = [...userData];
            
            sortedData.sort((a, b) => {
                let valueA, valueB;
                
                switch(criteria) {
                    case 'name':
                        valueA = a.name.toLowerCase();
                        valueB = b.name.toLowerCase();
                        break;
                    case 'email':
                        valueA = a.email.toLowerCase();
                        valueB = b.email.toLowerCase();
                        break;
                    case 'company':
                        valueA = a.company.name.toLowerCase();
                        valueB = b.company.name.toLowerCase();
                        break;
                    case 'website':
                        valueA = a.website.toLowerCase();
                        valueB = b.website.toLowerCase();
                        break;
                    default:
                        return 0;
                }
                
                return valueA.localeCompare(valueB);
            });
            
            displayData(sortedData);
        }
        
        // Event listener for sort dropdown
        document.getElementById('sortSelect').addEventListener('change', function(e) {
            sortData(e.target.value);
        });
        
        // Initialize the app
        fetchData();
