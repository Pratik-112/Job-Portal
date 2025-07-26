#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Sample job data - in a real implementation, this would come from your database
const sampleJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$120,000 - $160,000",
    type: "Full-time",
    description: "We're looking for a senior React developer to join our team...",
    requirements: ["5+ years React experience", "TypeScript", "Node.js"],
    posted: "2024-01-15"
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company: "StartupXYZ", 
    location: "Remote",
    salary: "$90,000 - $130,000",
    type: "Full-time",
    description: "Join our growing team as a frontend engineer...",
    requirements: ["3+ years JavaScript", "React or Vue.js", "CSS/SCSS"],
    posted: "2024-01-14"
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "InnovateLabs",
    location: "New York, NY",
    salary: "$100,000 - $140,000", 
    type: "Contract",
    description: "We need a versatile full stack developer...",
    requirements: ["React", "Node.js", "PostgreSQL", "AWS"],
    posted: "2024-01-13"
  }
];

class HirrdMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'hirrd-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          {
            uri: 'hirrd://jobs/all',
            mimeType: 'application/json',
            name: 'All Jobs',
            description: 'Complete list of all job postings',
          },
          {
            uri: 'hirrd://jobs/stats',
            mimeType: 'application/json', 
            name: 'Job Statistics',
            description: 'Statistics about job postings',
          },
        ],
      };
    });

    // Read specific resources
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      if (uri === 'hirrd://jobs/all') {
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(sampleJobs, null, 2),
            },
          ],
        };
      }

      if (uri === 'hirrd://jobs/stats') {
        const stats = {
          totalJobs: sampleJobs.length,
          jobsByType: sampleJobs.reduce((acc, job) => {
            acc[job.type] = (acc[job.type] || 0) + 1;
            return acc;
          }, {}),
          averageSalary: this.calculateAverageSalary(),
          topCompanies: [...new Set(sampleJobs.map(job => job.company))],
          locations: [...new Set(sampleJobs.map(job => job.location))],
        };

        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(stats, null, 2),
            },
          ],
        };
      }

      throw new Error(`Unknown resource: ${uri}`);
    });

    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'search_jobs',
            description: 'Search for jobs by title, company, location, or keywords',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query (job title, company, location, or keywords)',
                },
                type: {
                  type: 'string',
                  enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
                  description: 'Filter by job type',
                },
                location: {
                  type: 'string',
                  description: 'Filter by location',
                },
              },
              required: ['query'],
            },
          },
          {
            name: 'get_job_details',
            description: 'Get detailed information about a specific job',
            inputSchema: {
              type: 'object',
              properties: {
                jobId: {
                  type: 'number',
                  description: 'The ID of the job to retrieve',
                },
              },
              required: ['jobId'],
            },
          },
          {
            name: 'analyze_job_market',
            description: 'Analyze job market trends and provide insights',
            inputSchema: {
              type: 'object',
              properties: {
                skill: {
                  type: 'string',
                  description: 'Analyze market for a specific skill (optional)',
                },
              },
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'search_jobs':
          return this.searchJobs(args);
        case 'get_job_details':
          return this.getJobDetails(args);
        case 'analyze_job_market':
          return this.analyzeJobMarket(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  searchJobs(args) {
    const { query, type, location } = args;
    let results = sampleJobs;

    // Filter by query (search in title, company, description)
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.requirements.some(req => req.toLowerCase().includes(searchTerm))
      );
    }

    // Filter by type
    if (type) {
      results = results.filter(job => job.type === type);
    }

    // Filter by location
    if (location) {
      results = results.filter(job => 
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    return {
      content: [
        {
          type: 'text',
          text: `Found ${results.length} job(s) matching your criteria:\n\n${
            results.map(job => 
              `**${job.title}** at ${job.company}\n` +
              `📍 ${job.location} | 💼 ${job.type}\n` +
              `💰 ${job.salary}\n` +
              `📅 Posted: ${job.posted}\n`
            ).join('\n')
          }`,
        },
      ],
    };
  }

  getJobDetails(args) {
    const { jobId } = args;
    const job = sampleJobs.find(j => j.id === jobId);

    if (!job) {
      return {
        content: [
          {
            type: 'text',
            text: `Job with ID ${jobId} not found.`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: `# ${job.title}\n\n` +
                `**Company:** ${job.company}\n` +
                `**Location:** ${job.location}\n` +
                `**Type:** ${job.type}\n` +
                `**Salary:** ${job.salary}\n` +
                `**Posted:** ${job.posted}\n\n` +
                `## Description\n${job.description}\n\n` +
                `## Requirements\n${job.requirements.map(req => `• ${req}`).join('\n')}`,
        },
      ],
    };
  }

  analyzeJobMarket(args) {
    const { skill } = args;
    const totalJobs = sampleJobs.length;
    
    let analysis = `# Job Market Analysis\n\n`;
    analysis += `**Total Jobs Available:** ${totalJobs}\n\n`;
    
    // Job type distribution
    const typeDistribution = sampleJobs.reduce((acc, job) => {
      acc[job.type] = (acc[job.type] || 0) + 1;
      return acc;
    }, {});
    
    analysis += `## Job Types Distribution\n`;
    Object.entries(typeDistribution).forEach(([type, count]) => {
      const percentage = ((count / totalJobs) * 100).toFixed(1);
      analysis += `• ${type}: ${count} jobs (${percentage}%)\n`;
    });
    
    // Location analysis
    const locations = [...new Set(sampleJobs.map(job => job.location))];
    analysis += `\n## Available Locations\n`;
    locations.forEach(location => {
      const count = sampleJobs.filter(job => job.location === location).length;
      analysis += `• ${location}: ${count} jobs\n`;
    });
    
    // Skill-specific analysis
    if (skill) {
      const skillJobs = sampleJobs.filter(job => 
        job.requirements.some(req => req.toLowerCase().includes(skill.toLowerCase())) ||
        job.title.toLowerCase().includes(skill.toLowerCase()) ||
        job.description.toLowerCase().includes(skill.toLowerCase())
      );
      
      analysis += `\n## ${skill} Market Analysis\n`;
      analysis += `• Jobs requiring ${skill}: ${skillJobs.length} out of ${totalJobs}\n`;
      analysis += `• Market demand: ${((skillJobs.length / totalJobs) * 100).toFixed(1)}%\n`;
      
      if (skillJobs.length > 0) {
        analysis += `• Companies hiring for ${skill}:\n`;
        [...new Set(skillJobs.map(job => job.company))].forEach(company => {
          analysis += `  - ${company}\n`;
        });
      }
    }
    
    return {
      content: [
        {
          type: 'text',
          text: analysis,
        },
      ],
    };
  }

  calculateAverageSalary() {
    // Simple salary calculation - in reality you'd parse salary ranges properly
    const salaries = sampleJobs.map(job => {
      const match = job.salary.match(/\$(\d+),?(\d+)?/g);
      if (match && match.length >= 2) {
        const min = parseInt(match[0].replace(/\$|,/g, ''));
        const max = parseInt(match[1].replace(/\$|,/g, ''));
        return (min + max) / 2;
      }
      return 0;
    }).filter(salary => salary > 0);
    
    return salaries.length > 0 
      ? Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length)
      : 0;
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Hirrd MCP Server running on stdio');
  }
}

const server = new HirrdMCPServer();
server.run().catch(console.error);