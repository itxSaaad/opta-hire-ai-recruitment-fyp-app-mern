const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');

const { User, Resume } = require('../models');

const { validateString, validateArray } = require('../utils/validation.utils');

/**
 * @desc Creates the User Resume.
 *
 * @route POST /api/v1/resumes
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {Error} If the user is not found.
 */

const createUserResume = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const {
    title,
    summary,
    headline,
    skills,
    experience,
    education,
    industry,
    availability,
    company,
    achievements,
    portfolio,
  } = req.body;

  if (!title || !summary || !skills || !experience || !education) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error('Missing required fields');
  }

  const validatedData = {
    title: title ? validateString(title, 'Title', 3, 100) : null,
    summary: summary ? validateString(summary, 'Summary', 10, 1000) : null,
    headline: headline ? validateString(headline, 'Headline', 3, 200) : null,
    skills: skills ? validateArray(skills, 'Skills', 1, 20) : null,
    experience: experience
      ? validateString(experience, 'Experience', 10, 5000)
      : null,
    education: education
      ? validateString(education, 'Education', 10, 2000)
      : null,
    industry: industry ? validateString(industry, 'Industry', 2, 100) : null,
    availability: availability
      ? validateString(availability, 'Availability', 2, 50)
      : null,
    company: company ? validateString(company, 'Company', 2, 100) : null,
    achievements: achievements
      ? validateString(achievements, 'Achievements', 0, 1000)
      : null,
    portfolio: portfolio
      ? validateString(portfolio, 'Portfolio', 0, 255)
      : null,
    userId,
  };

  const existingProfile = await Resume.findOne({ where: { userId } });

  if (existingProfile) {
    res.status(StatusCodes.CONFLICT);
    throw new Error('Resume already exists for this user.');
  }

  const profile = await Resume.create(validatedData);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Resume created successfully.',
    profile,
    timestamp: new Date().toISOString(),
  });
});

/**
 * @desc Gets the User Resume.
 *
 * @route GET /api/v1/resumes/user
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {Error} If the user is not found.
 */

const getUserResume = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const profile = await Resume.findOne({ where: { userId } });

  if (!profile) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Resume not found for this user.');
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Resume retrieved successfully.',
    profile,
    timestamp: new Date().toISOString(),
  });
});

/**
 * @desc Updates the User Resume.
 *
 * @route PUT /api/v1/resumes/user
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {Error} If the user is not found.
 */

const updateUserResume = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const {
    title,
    summary,
    headline,
    skills,
    experience,
    education,
    industry,
    availability,
    company,
    achievements,
    portfolio,
  } = req.body;

  if (!title || !summary || !skills || !experience || !education) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error('Missing required fields');
  }

  const validatedData = {
    title: title ? validateString(title, 'Title', 3, 100) : null,
    summary: summary ? validateString(summary, 'Summary', 10, 1000) : null,
    headline: headline ? validateString(headline, 'Headline', 3, 200) : null,
    skills: skills ? validateArray(skills, 'Skills', 1, 20) : null,
    experience: experience
      ? validateString(experience, 'Experience', 10, 5000)
      : null,
    education: education
      ? validateString(education, 'Education', 10, 2000)
      : null,
    industry: industry ? validateString(industry, 'Industry', 2, 100) : null,
    availability: availability
      ? validateString(availability, 'Availability', 2, 50)
      : null,
    company: company ? validateString(company, 'Company', 2, 100) : null,
    achievements: achievements
      ? validateString(achievements, 'Achievements', 0, 1000)
      : null,
    portfolio: portfolio
      ? validateString(portfolio, 'Portfolio', 0, 255)
      : null,
    userId,
  };

  const profile = await Resume.findOne({ where: { userId } });

  if (!profile) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Resume not found for this user.');
  }

  await profile.update(validatedData);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Resume updated successfully.',
    profile,
    timestamp: new Date().toISOString(),
  });
});

/**
 * @desc Deletes the user profile.
 *
 * @route DELETE /api/v1/resumes/user
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {Error} If the user is not found.
 */

const deleteUserResume = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const profile = await Resume.findOne({ where: { userId } });

  if (!profile) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Resume not found for this user.');
  }

  await profile.destroy();

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Resume deleted successfully.',
    timestamp: new Date().toISOString(),
  });
});

/**
 * @desc Gets All Resumes.
 *
 * @route GET /api/v1/resumes
 * @access Private And Admin
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {Error} If the user is not found.
 */

const getAllUserResumes = asyncHandler(async (req, res) => {
  const profiles = await Resume.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['firstName', 'lastName', 'email', 'phone'],
      },
    ],
  });

  if (!profiles || profiles.length === 0) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('No profiles found.');
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Profiles retrieved successfully.',
    count: profiles.length,
    profiles,
    timestamp: new Date().toISOString(),
  });
});

module.exports = {
  createUserResume,
  getUserResume,
  updateUserResume,
  deleteUserResume,
  getAllUserResumes,
};
