# Hirrd MCP Server

A Model Context Protocol (MCP) server for the Hirrd job board application. This server provides AI assistants with access to job data and job market analysis tools.

## Features

### Resources
- **All Jobs** (`hirrd://jobs/all`) - Complete list of all job postings
- **Job Statistics** (`hirrd://jobs/stats`) - Statistics about job postings including distribution by type, locations, and salary analysis

### Tools
- **search_jobs** - Search for jobs by title, company, location, or keywords with optional filters
- **get_job_details** - Get detailed information about a specific job by ID
- **analyze_job_market** - Analyze job market trends and provide insights, optionally for a specific skill

## Installation

1. Navigate to the mcp-server directory:
```bash
cd mcp-server
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Running the Server

Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### Configuring with Claude Desktop

Add this server to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "hirrd": {
      "command": "node",
      "args": ["/path/to/your/mcp-server/index.js"],
      "env": {}
    }
  }
}
```

### Example Usage

Once connected, you can ask Claude to:

- "Search for React developer jobs"
- "Show me job statistics"
- "Get details for job ID 1"
- "Analyze the job market for Python skills"
- "Find remote jobs"
- "Show me all full-time positions"

## Extending the Server

To connect this server to your real Hirrd application:

1. **Database Integration**: Replace the sample data with actual database queries to your Supabase instance
2. **Authentication**: Add authentication if needed for private job data
3. **Real-time Updates**: Implement webhooks or polling for real-time job data
4. **Additional Tools**: Add more tools like job application tracking, salary comparisons, etc.

### Sample Database Integration

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Replace sampleJobs with:
async function getJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}
```

## API Reference

### Resources

#### `hirrd://jobs/all`
Returns all available job postings in JSON format.

#### `hirrd://jobs/stats`
Returns job market statistics including:
- Total job count
- Distribution by job type
- Average salary
- Top companies
- Available locations

### Tools

#### `search_jobs`
Search and filter jobs.

**Parameters:**
- `query` (required): Search term for job title, company, location, or keywords
- `type` (optional): Filter by job type (Full-time, Part-time, Contract, Internship)
- `location` (optional): Filter by location

#### `get_job_details`
Get detailed information about a specific job.

**Parameters:**
- `jobId` (required): The ID of the job to retrieve

#### `analyze_job_market`
Analyze job market trends and provide insights.

**Parameters:**
- `skill` (optional): Analyze market for a specific skill

## License

MIT