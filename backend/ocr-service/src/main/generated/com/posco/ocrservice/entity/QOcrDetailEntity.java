package com.posco.ocrservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOcrDetailEntity is a Querydsl query type for OcrDetailEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOcrDetailEntity extends EntityPathBase<OcrDetailEntity> {

    private static final long serialVersionUID = 914777987L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOcrDetailEntity ocrDetailEntity = new QOcrDetailEntity("ocrDetailEntity");

    public final NumberPath<Long> count = createNumber("count", Long.class);

    public final StringPath description = createString("description");

    public final NumberPath<Long> ocrDetailId = createNumber("ocrDetailId", Long.class);

    public final QOcrEntity ocrEntity;

    public final NumberPath<Long> ocrId = createNumber("ocrId", Long.class);

    public final NumberPath<Double> sumPrice = createNumber("sumPrice", Double.class);

    public final NumberPath<Double> unitPrice = createNumber("unitPrice", Double.class);

    public QOcrDetailEntity(String variable) {
        this(OcrDetailEntity.class, forVariable(variable), INITS);
    }

    public QOcrDetailEntity(Path<? extends OcrDetailEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOcrDetailEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOcrDetailEntity(PathMetadata metadata, PathInits inits) {
        this(OcrDetailEntity.class, metadata, inits);
    }

    public QOcrDetailEntity(Class<? extends OcrDetailEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.ocrEntity = inits.isInitialized("ocrEntity") ? new QOcrEntity(forProperty("ocrEntity")) : null;
    }

}

