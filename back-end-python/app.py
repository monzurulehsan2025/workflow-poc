from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATA = {
  "user": {
    "name": "Sarah Romanus",
    "role": "Engineering Manager, Core Platform",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  "stats": [
    { "label": "Tasks Completed", "value": 142, "trend": "+12%" },
    { "label": "Active Projects", "value": 8, "trend": "+2" },
    { "label": "Team Members", "value": 7, "trend": "Stable" },
    { "label": "Upcoming Milestones", "value": 3, "trend": "-1" }
  ],
  "projects": [
    {
      "id": "p1",
      "name": "Custom Fields v2",
      "status": "On Track",
      "progress": 75,
      "color": "coral"
    },
    {
      "id": "p2",
      "name": "Task Types Refactor",
      "status": "At Risk",
      "progress": 40,
      "color": "purple"
    },
    {
      "id": "p3",
      "name": "Work Graph Expansion",
      "status": "On Track",
      "progress": 90,
      "color": "green"
    }
  ],
  "tasks": [
    {
      "id": "t1",
      "title": "Review 'Core Platform' Roadmap Q3",
      "project": "Work Graph Expansion",
      "assignee": "Sarah",
      "dueDate": "Today",
      "priority": "High",
      "customFields": [
        { "name": "Team", "value": "Core Platform" },
        { "name": "Initiative", "value": "Strategic" }
      ]
    },
    {
      "id": "t2",
      "title": "Onboard new engineer for Task Types",
      "project": "Task Types Refactor",
      "assignee": "Sarah",
      "dueDate": "Tomorrow",
      "priority": "Medium",
      "customFields": [
        { "name": "Team", "value": "Core Platform" }
      ]
    },
    {
      "id": "t3",
      "title": "Finalize Custom Fields API Specs",
      "project": "Custom Fields v2",
      "assignee": "Sarah",
      "dueDate": "In 3 Days",
      "priority": "High",
      "customFields": [
        { "name": "Type", "value": "Technical Spec" }
      ]
    },
    {
      "id": "t4",
      "title": "1:1 with Product Manager",
      "project": "General",
      "assignee": "Sarah",
      "dueDate": "Friday",
      "priority": "Low",
      "customFields": []
    },
    {
      "id": "t5",
      "title": "Approve Q4 Budget Allocation",
      "project": "Core Platform",
      "assignee": "Sarah",
      "dueDate": "Wednesday",
      "priority": "High",
      "customFields": [
        { "name": "Type", "value": "Finance" }
      ]
    }
  ]
}

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
    return jsonify(DATA)

if __name__ == '__main__':
    app.run(port=5001, debug=True)
