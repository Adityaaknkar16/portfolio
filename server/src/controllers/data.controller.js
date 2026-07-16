import Project from '../models/Project.js';
import Skill from '../models/Skill.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ number: 1 });
    return res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error('Fetch projects error: ', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve projects.' });
  }
};

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    // Re-format to the structure the client expects
    const formattedSkills = {};
    skills.forEach(skill => {
      formattedSkills[skill.category] = skill.items;
    });
    return res.status(200).json({ success: true, data: formattedSkills });
  } catch (error) {
    console.error('Fetch skills error: ', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve skills.' });
  }
};
