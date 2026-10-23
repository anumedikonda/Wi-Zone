package com.examly.springapp.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
@Slf4j
public class LoggingAspect {

    @Around(
        "execution(* com.examly.springapp.controller..*(..)) || " +
        "execution(* com.examly.springapp.service..*(..)) || " +
        "execution(* com.examly.springapp.repository..*(..))"
    )
    public Object logExecution(ProceedingJoinPoint joinPoint)
            throws Throwable {

        String className =
                joinPoint.getSignature().getDeclaringTypeName();

        String methodName =
                joinPoint.getSignature().getName();

        Object[] args = joinPoint.getArgs();

        long startTime = System.currentTimeMillis();

        log.info(
                "ENTERING {}.{}() with arguments: {}",
                className,
                methodName,
                Arrays.toString(args)
        );

        try {

            Object result = joinPoint.proceed();

            long executionTime =
                    System.currentTimeMillis() - startTime;

            log.info(
                    "EXITING {}.{}() | Time: {} ms | Result: {}",
                    className,
                    methodName,
                    executionTime,
                    result
            );

            return result;

        } catch (Exception ex) {

            long executionTime =
                    System.currentTimeMillis() - startTime;

            log.error(
                    "EXCEPTION in {}.{}() | Time: {} ms | Message: {}",
                    className,
                    methodName,
                    executionTime,
                    ex.getMessage(),
                    ex
            );

            throw ex;
        }
    }
}