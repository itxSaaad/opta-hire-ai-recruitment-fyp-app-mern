'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        firstName: 'Admin',
        lastName: 'User',
        phone: '+1234567890',
        email: 'admin@optahire.com',
        password: await bcrypt.hash('AdminPass123', 10),
        isVerified: true,
        isLinkedinVerified: false,
        isAdmin: true,
        isRecruiter: false,
        isInterviewer: false,
        isCandidate: false,
        isTopRated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Recruiter',
        lastName: 'User',
        phone: '+1234567891',
        email: 'recruiter@optahire.com',
        password: await bcrypt.hash('RecruiterPass123', 10),
        isVerified: true,
        isLinkedinVerified: false,
        isAdmin: false,
        isRecruiter: true,
        isInterviewer: false,
        isCandidate: false,
        isTopRated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Interviewer',
        lastName: 'User',
        phone: '+1234567892',
        email: 'interviewer@optahire.com',
        password: await bcrypt.hash('InterviewerPass123', 10),
        isVerified: true,
        isLinkedinVerified: false,
        isAdmin: false,
        isRecruiter: false,
        isInterviewer: true,
        isCandidate: false,
        isTopRated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Candidate',
        lastName: 'User',
        phone: '+1234567893',
        email: 'candidate@optahire.com',
        password: await bcrypt.hash('CandidatePass123', 10),
        isVerified: true,
        isLinkedinVerified: false,
        isAdmin: false,
        isRecruiter: false,
        isInterviewer: false,
        isCandidate: true,
        isTopRated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
