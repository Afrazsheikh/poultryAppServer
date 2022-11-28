const logger = require('../../config/logger');
const models = require('../../models');


const adminLogin = (admin) => {

    return new Promise(async (resolve, reject) => {
        try 
        {
            let adminData = await models.admin.findOne(
                {email: admin.email},
                {__v: 0} 
            );

            if(adminData)
            {
                if(admin.password == adminData.password) {   
                    resolve(adminData);
                }
                else {
                    reject(new Error('Invalid Email or Password'));
                }
            }
            else {
                reject(new Error('Invalid Email or Password'));
            }
        }
        catch(err)
        {   
            logger.fatal(err)
            reject({code: 401, msg: err});
        }
    })

}

const getUserList = () => {
    return new Promise(async (resolve, reject) => {
        try
        {
            const users = models.user.find({isActive: true}, {__v: 0});
            resolve(users);
        }
        catch(err)
        {
            logger.fatal(err)
            reject({code: 401, msg: err});
        }
    })
}


const getNewUsers = () => {
    return new Promise (async (resolve, reject) => {
        try
		{
            let newUsers = await models.user.find({isActive: false}, {__v: 0});
            logger.info(newUsers);
            resolve(newUsers);
        }
   		catch(err)
        {
            logger.fatal(err)
            reject({code: 401, msg: err});
        }
    })
}

const activateUser = (userId) => {
	return new Promise (async (resolve, reject) => {
		try
		{
			let user = await models.user.findOneAndUpdate(
				{_id: userId},
				{$set: {isActive: true}},
				{returnOriginal: false}
			);

			resolve(user);
		}
		catch(err)
		{
			logger.fatal(err)
            reject({code: 401, msg: err});
		}
	})
}


const getSellingGraphs = (id) => {

	return new Promise(async (resolve, reject) => {
		try
		{
			let year = moment().format('YYYY')
			let months = [
				{mon: year+"01", totalSellings: 0}, {mon: year+"02", totalSellings: 0}, {mon: year+"03", totalSellings: 0},
				{mon: year+"04", totalSellings: 0}, {mon: year+"05", totalSellings: 0}, {mon: year+"06", totalSellings: 0},
				{mon: year+"07", totalSellings: 0}, {mon: year+"08", totalSellings: 0}, {mon: year+"09", totalSellings: 0},
				{mon: year+"10", totalSellings: 0}, {mon: year+"11", totalSellings: 0}, {mon: year+"12", totalSellings: 0},
			];

			let months2 = [
				{mon: year+"01", totalSellings: 0}, {mon: year+"02", totalSellings: 0}, {mon: year+"03", totalSellings: 0},
				{mon: year+"04", totalSellings: 0}, {mon: year+"05", totalSellings: 0}, {mon: year+"06", totalSellings: 0},
				{mon: year+"07", totalSellings: 0}, {mon: year+"08", totalSellings: 0}, {mon: year+"09", totalSellings: 0},
				{mon: year+"10", totalSellings: 0}, {mon: year+"11", totalSellings: 0}, {mon: year+"12", totalSellings: 0},
			];

			let months3 = [
				{mon: year+"01", totalSales: 0}, {mon: year+"02", totalSales: 0}, {mon: year+"03", totalSales: 0},
				{mon: year+"04", totalSales: 0}, {mon: year+"05", totalSales: 0}, {mon: year+"06", totalSales: 0},
				{mon: year+"07", totalSales: 0}, {mon: year+"08", totalSales: 0}, {mon: year+"09", totalSales: 0},
				{mon: year+"10", totalSales: 0}, {mon: year+"11", totalSales: 0}, {mon: year+"12", totalSales: 0},
			];

			let totalSellings = await getOrderslist(id, 'ACCEPTED', 0,6);
			
			
			logger.info('group result...', totalSellings);
			
			for await (let month of totalSellings)
			{
				if(months.some(m => month._id == m.mon)) 
				{
					logger.info('found...', month._id);
					let index = months.findIndex((monthIndex) => {
						return monthIndex.mon == month._id;
					})
					
					logger.info('Months index...', index);
					months[index].totalSellings = month.totalSellings;
				}
			}


			let totalDeclined = await  getOrderslist(id, 'DENIED', 0,6);

			
			logger.info('group result...', totalDeclined);
			
			for await (let month of totalDeclined)
			{
				if(months2.some(m => month._id == m.mon)) 
				{
					logger.info('found...', month._id);
					let index = months2.findIndex((monthIndex) => {
						return monthIndex.mon == month._id;
					})
					
					logger.info('Months index...', index);
					months2[index].totalSellings = month.totalSellings;
				}
			}


			let totalSales = await getSaleslist(id, 'ACCEPTED', 0,6);

			
			logger.info('group result...', totalSales);
			
			for await (let month of totalSales)
			{
				if(months3.some(m => month._id == m.mon)) 
				{
					logger.info('found...', month._id);
					let index = months3.findIndex((monthIndex) => {
						return monthIndex.mon == month._id;
					})
					
					logger.info('Months index...', index);
					months3[index].totalSales = month.totalSales;
				}
			}


			
			resolve({totalAccepted: months, totalDenied: months2, totalSales: months3});
		}
		catch(err)
		{
			logger.fatal(err);
			reject({code: 401, msg: err});
		}
	})
	
}



const getDaysGraphs = (id) => {

	return new Promise(async (resolve, reject) => {
		try
		{
			let year = moment().format('YYYY')
			let daysCount = moment().daysInMonth();
			let days = [], days1 =[], days2 = [];

			for(let day = 1; day <= daysCount; day++)
			{
				days.push({dates: year+"10"+day, totalOrders: 0})
				days1.push({dates: year+"10"+day, totalOrders: 0})
				days2.push({dates: year+"10"+day, totalSales: 0})
			}

			let totalOrders = await getOrderslist(id, 'ACCEPTED', 0, 8);
			
			
			logger.info('group result...', totalOrders);
			
			for await (let day of totalOrders)
			{
				if(days.some(d => day._id == d.dates)) 
				{
					logger.info('found...', day._id);
					let index = days.findIndex((dayIndex) => {
						return dayIndex.dates == day._id;
					})
					
					logger.info('Days index...', index);
					days[index].totalOrders = day.totalOrders;
				}
			}

			let totalDeclined = await  getOrderslist(id, 'DENIED', 0,8);

			
			logger.info('group result...', totalDeclined);
			
			for await (let day of totalDeclined)
			{
				if(days1.some(d => day._id == d.dates)) 
				{
					logger.info('found...', day._id);
					let index = days1.findIndex((dayIndex) => {
						return dayIndex.dates == day._id;
					})
					
					logger.info('Days index...', index);
					days1[index].totalOrders = day.totalOrders;
				}
			}

			let totalSales = await getSaleslist(id, 'ACCEPTED', 0,8);

			
			logger.info('group result...', totalSales);
			
			for await (let day of totalSales)
			{
				if(days2.some(d => day._id == d.dates)) 
				{
					logger.info('found...', day._id);
					let index = days2.findIndex((dayIndex) => {
						return dayIndex.dates == day._id;
					})
					
					logger.info('days index...', index);
					days2[index].totalSales = day.totalSales;
				}
			}


			resolve({totalAccepted: days, totalDenied: days1, totalSales: days2});
		}
		catch(err)
		{
			logger.fatal(err);
			reject({code: 401, msg: err});
		}
	})
	
}



const getUserDetails = (userId) => {
	return new Promise (async (resolve, reject) => {
		try
		{
			let user = await models.user.findOne(
				{_id: userId},
			
			);
			console.log("checking getActivateUser", user)

			resolve(user);
		}
		catch(err)
		{
			logger.fatal(err)
            reject({code: 401, msg: err});
		}
	})
}




module.exports = {
    adminLogin,
    getUserList,
    getSellingGraphs,
    getDaysGraphs,
	activateUser,
    getNewUsers,
	getUserDetails
}