//user model
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define( "category", {
        name: {
            type: DataTypes.STRING,
            unique:true,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        },
    }, {timestamps: true}, )
    return Category
}