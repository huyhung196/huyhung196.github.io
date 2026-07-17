// Mebieco AI Chatbot Interactive Terminal Controller

document.addEventListener('DOMContentLoaded', () => {
    const terminalBody = document.getElementById('terminal-body');
    const sandboxBtns = document.querySelectorAll('.sandbox-btn');
    const promptInput = document.getElementById('prompt-input');
    
    // Scenarios data
    const scenarios = {
        sales: [
            { type: 'info', text: 'Received user query: "Hỏi doanh thu tháng 05/2026 và so sánh với tháng trước"' },
            { type: 'info', text: 'Generating embedding vector for query...' },
            { type: 'info', text: 'RAG: Checking schema documentation mapping...' },
            { type: 'success', text: 'RAG Schema Match: Found matching table "sales"' },
            { type: 'warning', text: 'TEXT-TO-SQL: Vanna.ai translating prompt to SQL syntax...' },
            { type: 'sql', text: 'SELECT \n  DATE_TRUNC(\'month\', sale_date) as month, \n  SUM(amount) as total_sales \nFROM sales \nWHERE sale_date >= \'2026-04-01\' AND sale_date <= \'2026-05-31\' \nGROUP BY 1 ORDER BY 1;' },
            { type: 'info', text: 'DATABASE: Executing query on pg_sales_db...' },
            { type: 'info', text: 'DATABASE: Fetched 2 rows. Formatting results...' },
            { type: 'table', text: '+------------+-----------------+\n| Month      | Total Sales     |\n+------------+-----------------+\n| 2026-04    | 450,000,000 VND |\n| 2026-05    | 520,000,000 VND |\n+------------+-----------------+' },
            { type: 'info', text: 'Azure OpenAI: Sending query results & context to GPT-4o-Mini...' },
            { type: 'success', text: 'RESPONSE: Doanh thu tháng 05/2026 đạt 520,000,000 VNĐ, tăng trưởng 15.5% so với tháng 04/2026 (đạt 450,000,000 VNĐ).' }
        ],
        rag: [
            { type: 'info', text: 'Received user query: "Chính sách đổi trả hàng hóa Mebieco trong vòng bao nhiêu ngày?"' },
            { type: 'info', text: 'Calling Azure OpenAI Text-Embedding-3-Large API...' },
            { type: 'info', text: 'PGVECTOR: Executing cosine distance search with HNSW index on tbl_policy_embeddings...' },
            { type: 'success', text: 'PGVECTOR: Found 2 relevant document chunks (Threshold > 0.75):' },
            { type: 'warning', text: ' -> Chunk #1 [ID: policy_702] [Similarity: 0.894]\n    "Chính sách trả hàng Mebieco quy định khách hàng được đổi trả sản phẩm lỗi kỹ thuật trong vòng 30 ngày kể từ ngày in hóa đơn..."' },
            { type: 'warning', text: ' -> Chunk #2 [ID: policy_112] [Similarity: 0.742]\n    "Thủ tục đổi trả yêu cầu sản phẩm còn nguyên tem mác, hộp đựng và có hóa đơn mua hàng kèm theo..."' },
            { type: 'info', text: 'Azure OpenAI: Sending retrieved contexts to GPT-4o-Mini for synthesis...' },
            { type: 'success', text: 'RESPONSE: Theo chính sách đổi trả chính thức của Mebieco, các sản phẩm bị lỗi kỹ thuật từ nhà sản xuất được hỗ trợ đổi trả hoàn toàn miễn phí trong vòng 30 ngày kể từ ngày mua hàng (căn cứ trên hóa đơn). Yêu cầu sản phẩm còn nguyên tem mác và hộp đựng ban đầu.' }
        ],
        fallback: [
            { type: 'info', text: 'Received user query: "Giải thích kiến trúc FastAPI Asyncio"' },
            { type: 'info', text: 'PGVECTOR: Searching vector index... No matching chunks found (Max similarity: 0.42 < 0.65)' },
            { type: 'info', text: 'TEXT-TO-SQL: No database tables or columns relate to "FastAPI Asyncio"' },
            { type: 'warning', text: 'ROUTER: Query does not match local knowledge. Routing to Azure OpenAI GPT-4o (General Knowledge Mode)...' },
            { type: 'info', text: 'Azure OpenAI: Awaiting streaming response...' },
            { type: 'success', text: 'RESPONSE: FastAPI được xây dựng trên Starlette và Pydantic, hỗ trợ đầy đủ lập trình bất đồng bộ nhờ chuẩn ASGI. Khi viết một endpoint với "async def", FastAPI chạy nó trên single-thread event loop (sử dụng thư viện asyncio), cho phép xử lý hàng ngàn kết nối I/O-bound đồng thời mà không bị nghẽn (blocking) luồng chính.' }
        ]
    };

    let isRunning = false;

    // Helper to print a line with a typewriter effect
    function printLine(type, text, delay) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = 'log-line';
                
                const timeSpan = document.createElement('span');
                timeSpan.className = 'log-time';
                const now = new Date();
                timeSpan.textContent = `[${now.toTimeString().split(' ')[0]}]`;
                line.appendChild(timeSpan);
                
                const contentSpan = document.createElement('span');
                if (type === 'info') {
                    contentSpan.className = 'log-info';
                    contentSpan.innerHTML = `[INFO] ${text}`;
                } else if (type === 'success') {
                    contentSpan.className = 'log-success';
                    contentSpan.innerHTML = `[SUCCESS] ${text}`;
                } else if (type === 'warning') {
                    contentSpan.className = 'log-warning';
                    contentSpan.innerHTML = `[WARN] ${text}`;
                } else if (type === 'error') {
                    contentSpan.className = 'log-error';
                    contentSpan.innerHTML = `[ERROR] ${text}`;
                } else if (type === 'sql') {
                    contentSpan.className = 'log-sql';
                    contentSpan.textContent = text;
                } else if (type === 'table') {
                    contentSpan.className = 'log-table';
                    contentSpan.textContent = text;
                }
                
                line.appendChild(contentSpan);
                terminalBody.appendChild(line);
                
                // Scroll terminal to bottom
                terminalBody.scrollTop = terminalBody.scrollHeight;
                
                resolve();
            }, delay);
        });
    }

    // Run scenario
    async function runScenario(key) {
        if (isRunning) return;
        isRunning = true;
        
        // Clear terminal output but keep prompt area
        terminalBody.innerHTML = '';
        
        // Disable buttons during run
        sandboxBtns.forEach(btn => btn.style.opacity = '0.5');
        
        const lines = scenarios[key];
        
        // Simulate prompt typing in active prompt
        if (promptInput) {
            promptInput.textContent = '';
            const promptText = key === 'sales' ? 'Hỏi doanh thu tháng 05/2026 và so sánh...' :
                               key === 'rag' ? 'Chính sách đổi trả hàng hóa Mebieco...' : 
                               'Giải thích kiến trúc FastAPI Asyncio';
            
            for (let i = 0; i < promptText.length; i++) {
                await new Promise(r => setTimeout(r, 30));
                promptInput.textContent += promptText[i];
            }
        }
        
        // Print terminal logs
        for (const line of lines) {
            let delay = 600;
            if (line.type === 'sql' || line.type === 'table') {
                delay = 300;
            }
            await printLine(line.type, line.text, delay);
        }
        
        // Clear prompt text after success
        setTimeout(() => {
            if (promptInput) promptInput.textContent = '';
        }, 3000);
        
        // Enable buttons
        sandboxBtns.forEach(btn => btn.style.opacity = '1');
        isRunning = false;
    }

    // Bind event listeners
    sandboxBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const scenarioKey = btn.getAttribute('data-scenario');
            if (scenarioKey) {
                runScenario(scenarioKey);
            }
        });
    });

    // Auto-run first scenario for initial layout wow factor
    setTimeout(() => {
        runScenario('sales');
    }, 1200);
});
