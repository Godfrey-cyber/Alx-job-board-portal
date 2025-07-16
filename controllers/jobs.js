import Job from '../models/Job.js'
import mongoose from 'mongoose'
import Counter from '../models/Counter.js'
import slugify from 'slugify'
import { allowedUpdates } from "../utilities/utiles.js"

export const addJob = async (req, res, next) => {
	try {
		const { title, description, location, requirements, employmentType, maxSalary, minSalary, benefits, categories, tags, remote, views, applicationDeadline, status, postedBy, isSyncedToElastic  } =
			req.body

		// Basic validation
		if (
			!title ||
			!description ||
			!employmentType ||
			!maxSalary ||
			!minSalary ||
			!requirements ||
			!location ||
			!benefits || 
			!categories || 
			!tags || 
			!applicationDeadline
		) {
			return res.status(400).json({ message: '❌ Required fields are missing.' })
		}

		const slug = slugify(title, { lower: true })

		// Check for duplicate slug
		const existingJob = await Job.findOne({ slug })
		if (existingJob) {
			return res.status(409).json({ message: '🚫 A Job with this title already exists.' })
		}

		// Create the Job
		const newJob = new Job({
			title, description, location, requirements, employmentType, maxSalary, minSalary, benefits, categories, tags, remote, views, applicationDeadline, status, postedBy: req.userId, isSyncedToElastic
		})
		await newJob.save()
		console.log(req.user)
		res.status(201).json({
			message: '✅ Job created successfully!',
			job: newJob,
		})
	} catch (error) {
		console.error('Error adding job:', error.message)
		next()
	}
}

export const jobs = async (req, res, next) => {
  try {
    const {
      search,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
      categories,
      tags,
      employmentType,
      remote,
      minSalary,
      maxSalary
    } = req.query;

    const pipeline = [];

    // Search filter
    if (search) {
      const regex = new RegExp(search, 'i');
      pipeline.push({
        $match: {
          $or: [
            { title: regex },
            { description: regex },
            { employmentType: regex },
            { categories: regex }
          ]
        }
      });
    }

    // Filter by categories
    if (categories) {
      const categoriesArray = categories.split(',').map((item) => item.trim());
      pipeline.push({
        $match: {
          categories: { $in: categoriesArray }
        }
      });
    }

    // Filter by tags
    if (tags) {
      const tagsArray = tags.split(',').map((item) => item.trim());
      pipeline.push({
        $match: {
          tags: { $in: tagsArray }
        }
      });
    }

    // Filter by employment type
    if (employmentType) {
      pipeline.push({
        $match: { employmentType }
      });
    }

    // Filter by remote
    if (remote) {
      const isRemote = remote === 'true';
      pipeline.push({
        $match: { remote: isRemote }
      });
    }

    // Salary range filtering
    if (minSalary || maxSalary) {
      pipeline.push({
        $match: {
          ...(minSalary ? { minSalary: { $gte: Number(minSalary) } } : {}),
          ...(maxSalary ? { maxSalary: { $lte: Number(maxSalary) } } : {})
        }
      });
    }

    // Sorting
    const sortOrder = order === 'asc' ? 1 : -1;
    pipeline.push({ $sort: { [sortBy]: sortOrder } });

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: parseInt(limit) });

    // Project selected fields
    pipeline.push({
      $project: {
        title: 1,
        description: 1,
        categories: 1,
        location: 1,
        tags: 1,
        benefits: 1,
        postedBy: 1,
        createdAt: 1,
        salaryRange: 1,
        minSalary: 1,
        maxSalary: 1,
        remote: 1,
        employmentType: 1,
        slug: 1
      }
    });

    // Run aggregation
    const jobs = await Job.aggregate(pipeline);

    // For total count
    const countPipeline = pipeline.filter(
      (stage) => !('$skip' in stage) && !('$limit' in stage) && !('$project' in stage)
    );
    countPipeline.push({ $count: 'total' });
    const countResult = await Job.aggregate(countPipeline);
    const total = countResult[0]?.total || 0;

    // Response
    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      jobs,
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
    next(error);
  }
};

// my jobs
export const myJobs = async (req, res, next) => {
	try {
		// Optionally verify req.userId exists
	    if (!req.userId || !mongoose.Types.ObjectId.isValid(req.userId)) {
	      return res.status(401).json({ success: false, message: 'Unauthorized or User ID missing.' });
	    }

		const jobs = await Job.find({ postedBy: req.userId })
			.populate('postedBy', 'firstName email')
			.sort({ createdAt: -1 })
		res.status(200).json({
			success: true,
			count: jobs.length,
			jobs,
		})
	} catch (error) {
		console.log(error)
		next(error)
	}
}
// update a job
export const editJob = async (req, res, next) => {
	try {
		const { id } = req.params
		const job = await Job.findById(id)

		if (!job) {
			return res.status(404).json({ success: false, message: 'Job not found.' })
		}

		const allowedFields = [
			'title',
			'description',
			'maxSalary',
			'minSalary',
			'categories',
			'location',
			'benefits',
			'tags',
			'remote',
			'applicationDeadline',
			'status'
		]

		allowedUpdates(job, req.body, allowedFields)
		const updated = await job.save()
		res.status(200).json({
			success: true,
			message: '✅ Job updated successfully!',
			data: updated,
		})
	} catch (error) {
		console.log(error)
		next()
	}
}

export const getJob = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await Job.findById(id).populate('employer', 'firstName email')
    if (!result) {
      return res.status(404).json({ success: false, message: 'Sorry! No job found.' })
    }
    console.log("hello", result)
    res.status(200).json({
      success: true,
      result,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}