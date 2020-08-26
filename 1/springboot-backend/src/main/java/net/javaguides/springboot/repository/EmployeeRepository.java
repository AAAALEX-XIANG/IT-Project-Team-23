package net.javaguides.springboot.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import  net.javaguides.springboot.model.Employee;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, Long>{

}
